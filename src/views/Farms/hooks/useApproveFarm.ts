import { useCallback } from 'react'
import { ethers, Contract } from 'ethers'
import { useGrandGardener } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'

const useApproveFarm = (lpContract: Contract) => {
  const grandGardenerContract = useGrandGardener()
  const { callWithGasPrice } = useCallWithGasPrice()
  const handleApprove = useCallback(async () => {
    const tx = await callWithGasPrice(lpContract, 'approve', [
      grandGardenerContract.address,
      ethers.constants.MaxUint256,
    ])
    const receipt = await tx.wait()
    return receipt.status
  }, [lpContract, grandGardenerContract, callWithGasPrice])

  return { onApprove: handleApprove }
}

export default useApproveFarm
