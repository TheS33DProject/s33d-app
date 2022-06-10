import { useCallback } from 'react'
import { stakeFarm } from 'utils/calls'
import { useGrandGardener } from 'hooks/useContract'

const useStakeFarms = (pid: number) => {
  const grandGardenerContract = useGrandGardener()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stakeFarm(grandGardenerContract, pid, amount)
      console.info(txHash)
    },
    [grandGardenerContract, pid],
  )

  return { onStake: handleStake }
}

export default useStakeFarms
