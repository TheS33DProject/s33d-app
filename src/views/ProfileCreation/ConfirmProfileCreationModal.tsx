import React from 'react'
import { Modal, Flex, Text } from '@pancakeswap/uikit'
import { ethers } from 'ethers'
import { formatUnits } from '@ethersproject/units'
import { useAppDispatch } from 'state'
import { useTranslation } from 'contexts/Localization'
import { useS33D, useProfile } from 'hooks/useContract'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { fetchProfile } from 'state/profile'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import ApproveConfirmButtons from 'components/ApproveConfirmButtons'
import { REGISTER_COST } from './config'
import { State } from './contexts/types'

interface Props {
  userName: string
  selectedNft: State['selectedNft']
  account: string
  teamId: number
  minimumS33DRequired: ethers.BigNumber
  allowance: ethers.BigNumber
  onDismiss?: () => void
}

const ConfirmProfileCreationModal: React.FC<Props> = ({
  account,
  teamId,
  selectedNft,
  minimumS33DRequired,
  allowance,
  onDismiss,
}) => {
  const { t } = useTranslation()
  const profileContract = useProfile()
  const dispatch = useAppDispatch()
  const { toastSuccess } = useToast()
  const s33dContract = useS33D()
  const { callWithGasPrice } = useCallWithGasPrice()

  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
    useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        try {
          const response = await s33dContract.allowance(account, profileContract.address)
          return response.gte(minimumS33DRequired)
        } catch (error) {
          return false
        }
      },
      onApprove: () => {
        return callWithGasPrice(s33dContract, 'approve', [profileContract.address, allowance.toJSON()])
      },
      onConfirm: () => {
        return callWithGasPrice(profileContract, 'createProfile', [
          teamId,
          selectedNft.collectionAddress,
          selectedNft.tokenId,
        ])
      },
      onSuccess: async ({ receipt }) => {
        await dispatch(fetchProfile(account))
        onDismiss()
        toastSuccess(t('Profile created!'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      },
    })

  return (
    <Modal title={t('Complete Profile')} onDismiss={onDismiss}>
      <Text color="textSubtle" mb="8px">
        {t('Submitting NFT to contract and confirming User Name and Team.')}
      </Text>
      <Flex justifyContent="space-between" mb="16px">
        <Text>{t('Cost')}</Text>
        <Text>{t('%num% S33D', { num: formatUnits(REGISTER_COST) })}</Text>
      </Flex>
      <ApproveConfirmButtons
        isApproveDisabled={isConfirmed || isConfirming || isApproved}
        isApproving={isApproving}
        isConfirmDisabled={!isApproved || isConfirmed}
        isConfirming={isConfirming}
        onApprove={handleApprove}
        onConfirm={handleConfirm}
      />
    </Modal>
  )
}

export default ConfirmProfileCreationModal
