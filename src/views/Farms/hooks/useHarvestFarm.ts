import { useCallback } from 'react'
import { harvestFarm } from 'utils/calls'
import { useGrandGardener } from 'hooks/useContract'

const useHarvestFarm = (farmPid: number) => {
  const grandGardenerContract = useGrandGardener()

  const handleHarvest = useCallback(async () => {
    await harvestFarm(grandGardenerContract, farmPid)
  }, [farmPid, grandGardenerContract])

  return { onReward: handleHarvest }
}

export default useHarvestFarm
