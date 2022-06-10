import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import getGasPrice from 'utils/getGasPrice'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeFarm = async (grandGardenerContract, pid, amount) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  if (pid === 0) {
    const tx = await grandGardenerContract.enterStaking(value, { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await grandGardenerContract.deposit(pid, value, { ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}

export const unstakeFarm = async (grandGardenerContract, pid, amount) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  if (pid === 0) {
    const tx = await grandGardenerContract.leaveStaking(value, { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await grandGardenerContract.withdraw(pid, value, { ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}

export const harvestFarm = async (grandGardenerContract, pid) => {
  const gasPrice = getGasPrice()
  if (pid === 0) {
    const tx = await grandGardenerContract.leaveStaking('0', { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await grandGardenerContract.deposit(pid, '0', { ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}
