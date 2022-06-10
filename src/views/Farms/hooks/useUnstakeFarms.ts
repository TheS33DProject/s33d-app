import { useCallback } from 'react'
import { unstakeFarm } from 'utils/calls'
import { useGrandGardener } from 'hooks/useContract'

const useUnstakeFarms = (pid: number) => {
  const grandGardenerContract = useGrandGardener()

  const handleUnstake = useCallback(
    async (amount: string) => {
      await unstakeFarm(grandGardenerContract, pid, amount)
    },
    [grandGardenerContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakeFarms
