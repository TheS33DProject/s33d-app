import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { CurrencyAmount, JSBI, Token, Trade } from '@pancakeswap/sdk'
import {
  Button,
  Text,
  ArrowDownIcon,
  Box,
  useModal,
  Flex,
  IconButton,
  BottomDrawer,
  useMatchBreakpoints,
  Progress,
} from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import { getInitialS33DRoundAddress } from 'utils/addressHelpers'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import UnsupportedCurrencyFooter from 'components/UnsupportedCurrencyFooter'
import Footer from 'components/Menu/Footer'
import { RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import SwapWarningTokens from 'config/constants/swapWarningTokens'
import { useS33D, useInitialS33DRound } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import AddressInputPanel from './components/AddressInputPanel'
import { GreyCard } from '../../components/Card'
import Column, { AutoColumn } from '../../components/Layout/Column'
import ConfirmSwapModal from './components/ConfirmSwapModal'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { AutoRow, RowBetween } from '../../components/Layout/Row'
import AdvancedSwapDetailsDropdown from './components/AdvancedSwapDetailsDropdown'
import confirmPriceImpactWithoutFee from './components/confirmPriceImpactWithoutFee'
import { ArrowWrapper, SwapCallbackError, Wrapper } from './components/styleds'
import TradePrice from './components/TradePrice'
import ImportTokenWarningModal from './components/ImportTokenWarningModal'
import ProgressSteps from './components/ProgressSteps'
import { AppBody } from '../../components/App'
import ConnectWalletButton from '../../components/ConnectWalletButton'
import { INITIAL_ALLOWED_SLIPPAGE } from '../../config/constants'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useCurrency, useAllTokens } from '../../hooks/Tokens'
import {
  ApprovalState,
  useApproveCallback,
  useApproveCallbackFromTrade,
  useBuyS33dCallback,
} from '../../hooks/useApproveCallback'
import { useSwapCallback } from '../../hooks/useSwapCallback'
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback'
import { Field } from '../../state/swap/actions'
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
  useSingleTokenSwapInfo,
} from '../../state/swap/hooks'
import {
  useExpertModeManager,
  useUserSlippageTolerance,
  useUserSingleHopOnly,
  useExchangeChartManager,
} from '../../state/user/hooks'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { computeTradePriceBreakdown, warningSeverity } from '../../utils/prices'
import CircleLoader from '../../components/Loader/CircleLoader'
import Page from '../Page'
import SwapWarningModal from './components/SwapWarningModal'
import PriceChartContainer from './components/Chart/PriceChartContainer'
import { StyledInputCurrencyWrapper, StyledSwapContainer } from './styles'
import CurrencyInputHeader from './components/CurrencyInputHeader'

const Label = styled(Text)`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary};
`

const TextContainer = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
`

export default function Swap({ history }: RouteComponentProps) {
  const { account } = useActiveWeb3React()
  const initialS33DRound = useInitialS33DRound()
  const whitelist = initialS33DRound.getWhitelist()
  const [progressBar, setProgress] = useState(true)
  const [conversionSeedVal, setConversionSeedVal] = useState(0)
  const [filledSeed, setFilledSeed] = useState(45)
  const [availableSeeds, setAvailableSeeds] = useState(0)
  const [buyLimitSd, setbuyLimitSd] = useState(0)
  const availableS33D = initialS33DRound.getPouchBalance()
  const offerPrice = initialS33DRound.offerPrice()

  const formatMoney = (number) => {
    return number.toLocaleString('en-US', { currency: 'USD' })
  }
  if (account) {
    const contribution = initialS33DRound.contribution(account)
    Promise.all([contribution, whitelist, offerPrice, availableS33D]).then((res) => {
      const contributionVal = parseFloat(ethers.utils.formatUnits(res[0].toString(), 18).toString())
      const whiteListVal = parseFloat(ethers.utils.formatUnits(res[1].toString(), 18).toString())
      const ofrPrice = parseFloat(ethers.utils.formatUnits(res[2].toString(), 18).toString())
      const aS33D = parseFloat(ethers.utils.formatUnits(res[3].toString(), 18).toString())
      const total = (contributionVal / whiteListVal) * 100

      setAvailableSeeds(formatMoney(aS33D))
      setConversionSeedVal(formatMoney(ofrPrice))
      setFilledSeed(total)
      setbuyLimitSd(formatMoney(whiteListVal))
    })
  }

  const loadedUrlParams = useDefaultsFromURLSearch()
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const [isChartExpanded, setIsChartExpanded] = useState(false)
  const [userChartPreference, setUserChartPreference] = useExchangeChartManager(isMobile)
  const [isChartDisplayed, setIsChartDisplayed] = useState(userChartPreference)
  const { isDark, theme } = useTheme()
  useEffect(() => {
    setUserChartPreference(isChartDisplayed)
  }, [isChartDisplayed, setUserChartPreference])

  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
    [loadedInputCurrency, loadedOutputCurrency],
  )

  // dismiss warning if all imported tokens are in active lists
  const defaultTokens = useAllTokens()
  const importTokensNotInDefault =
    urlLoadedTokens &&
    urlLoadedTokens.filter((token: Token) => {
      return !(token.address in defaultTokens)
    })

  // for expert mode
  const [isExpertMode] = useExpertModeManager()

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance()

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()

  // Price data
  const {
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade

  const singleTokenPrice = useSingleTokenSwapInfo()

  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount,
      }
    : {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
      }

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()
  const isValid = !swapInputError
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT
  const [formValue, setFormValue]: any = useState({
    input: '',
    output: '',
  })
  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
      const covertedValue = (Number(value) * 10).toString()
      setFormValue({ input: value, output: covertedValue })
    },
    [setFormValue, onUserInput],
  )
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
      const covertedValue = (Number(value) / 10).toString()
      setFormValue({ input: covertedValue, output: value })
    },
    [setFormValue, onUserInput],
  )

  // modal and loading
  const [{ tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    tradeToConfirm: Trade | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const route = trade?.route
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0)),
  )
  const noRoute = !route

  // check whether the user has approved the router on the input token
  // const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)
  const [approval, approveCallback] = useApproveCallback(currencyBalances[Field.INPUT], getInitialS33DRoundAddress())

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(trade, allowedSlippage, recipient)

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

  const [singleHopOnly] = useUserSingleHopOnly()

  const [swapS33d] = useBuyS33dCallback(formValue.output, getInitialS33DRoundAddress())

  const handleSwap = useCallback(async () => {
    // if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee, t)) {
    //   return
    // }
    // if (!swapCallback) {
    //   return
    // }
    // setSwapState({ attemptingTxn: true, tradeToConfirm, swapErrorMessage: undefined, txHash: undefined })
    // swapCallback()
    //   .then((hash) => {
    //     setSwapState({ attemptingTxn: false, tradeToConfirm, swapErrorMessage: undefined, txHash: hash })
    //   })
    //   .catch((error) => {
    //     setSwapState({
    //       attemptingTxn: false,
    //       tradeToConfirm,
    //       swapErrorMessage: error.message,
    //       txHash: undefined,
    //     })
    //   })
    try {
      const approve = await swapS33d()
    } catch (error) {
      console.error(error)
    }
  }, [swapS33d])

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)

  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({ tradeToConfirm, attemptingTxn, swapErrorMessage, txHash })
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash])

  const handleAcceptChanges = useCallback(() => {
    setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn })
  }, [attemptingTxn, swapErrorMessage, trade, txHash])

  // swap warning state
  const [swapWarningCurrency, setSwapWarningCurrency] = useState(null)
  const [onPresentSwapWarningModal] = useModal(<SwapWarningModal swapCurrency={swapWarningCurrency} />)

  const shouldShowSwapWarning = (swapCurrency) => {
    const isWarningToken = Object.entries(SwapWarningTokens).find((warningTokenConfig) => {
      const warningTokenData = warningTokenConfig[1]
      return swapCurrency.address === warningTokenData.address
    })
    return Boolean(isWarningToken)
  }

  useEffect(() => {
    if (swapWarningCurrency) {
      onPresentSwapWarningModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapWarningCurrency])

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
      const showSwapWarning = shouldShowSwapWarning(inputCurrency)
      if (showSwapWarning) {
        setSwapWarningCurrency(inputCurrency)
      } else {
        setSwapWarningCurrency(null)
      }
    },
    [onCurrencySelection],
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  const handleOutputSelect = useCallback(
    (outputCurrency) => {
      onCurrencySelection(Field.OUTPUT, outputCurrency)
      const showSwapWarning = shouldShowSwapWarning(outputCurrency)
      if (showSwapWarning) {
        setSwapWarningCurrency(outputCurrency)
      } else {
        setSwapWarningCurrency(null)
      }
    },

    [onCurrencySelection],
  )

  const swapIsUnsupported = useIsTransactionUnsupported(currencies?.INPUT, currencies?.OUTPUT)

  const [onPresentImportTokenWarningModal] = useModal(
    <ImportTokenWarningModal tokens={importTokensNotInDefault} onCancel={() => history.push('/swap/')} />,
  )

  useEffect(() => {
    if (importTokensNotInDefault.length > 0) {
      onPresentImportTokenWarningModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importTokensNotInDefault.length])

  const [onPresentConfirmModal] = useModal(
    <ConfirmSwapModal
      trade={trade}
      originalTrade={tradeToConfirm}
      onAcceptChanges={handleAcceptChanges}
      attemptingTxn={attemptingTxn}
      txHash={txHash}
      recipient={recipient}
      allowedSlippage={allowedSlippage}
      onConfirm={handleSwap}
      swapErrorMessage={swapErrorMessage}
      customOnDismiss={handleConfirmDismiss}
    />,
    true,
    true,
    'confirmSwapModal',
  )

  const textWrapper = {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    color: '#002c00',
    padding: '10px 10px 10px 10px',
  }
  const textWrapperDark = {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    color: '#FFFCF1',
    padding: '10px 10px 10px 10px',
  }

  return (
    // <Page removePadding={isChartExpanded} hideFooterOnDesktop={isChartExpanded}>
    <Flex width="100%" justifyContent="center" position="relative">
      {/* {!isMobile && (
          <PriceChartContainer
            inputCurrencyId={inputCurrencyId}
            inputCurrency={currencies[Field.INPUT]}
            outputCurrencyId={outputCurrencyId}
            outputCurrency={currencies[Field.OUTPUT]}
            isChartExpanded={isChartExpanded}
            setIsChartExpanded={setIsChartExpanded}
            isChartDisplayed={isChartDisplayed}
            currentSwapPrice={singleTokenPrice}
          />
        )}
        <BottomDrawer
          content={
            <PriceChartContainer
              inputCurrencyId={inputCurrencyId}
              inputCurrency={currencies[Field.INPUT]}
              outputCurrencyId={outputCurrencyId}
              outputCurrency={currencies[Field.OUTPUT]}
              isChartExpanded={isChartExpanded}
              setIsChartExpanded={setIsChartExpanded}
              isChartDisplayed={isChartDisplayed}
              currentSwapPrice={singleTokenPrice}
              isMobile
            />
          }
          isOpen={isChartDisplayed}
          setIsOpen={setIsChartDisplayed}
        /> */}
      <Flex flexDirection="column">
        <StyledSwapContainer $isChartExpanded={isChartExpanded}>
          <StyledInputCurrencyWrapper mt={isChartExpanded ? '24px' : '0'} mr={isChartExpanded ? '0' : '0'}>
            <AppBody>
              <CurrencyInputHeader
                title={t('S33D Initial Offer')}
                subtitle={t('')}
                setIsChartDisplayed={setIsChartDisplayed}
                isChartDisplayed={isChartDisplayed}
              />
              <TextContainer>
                <Text style={isDark ? { ...textWrapperDark } : { ...textWrapper }}>Available</Text>
                <Text style={isDark ? { ...textWrapperDark } : { ...textWrapper }}>{availableSeeds} S33D</Text>
              </TextContainer>
              <TextContainer>
                <Text style={isDark ? { ...textWrapperDark } : { ...textWrapper }}>Offer Price</Text>
                <Text style={isDark ? { ...textWrapperDark } : { ...textWrapper }}>
                  {conversionSeedVal} USDT per S33D
                </Text>
              </TextContainer>
              <Wrapper id="swap-page">
                <AutoColumn gap="md">
                  <CurrencyInputPanel
                    label={independentField === Field.OUTPUT && !showWrap && trade ? t('From (estimated)') : t('From')}
                    value={formValue.input}
                    showMaxButton={!atMaxAmountInput}
                    currency={currencies[Field.INPUT]}
                    onUserInput={handleTypeInput}
                    onMax={handleMaxInput}
                    onCurrencySelect={handleInputSelect}
                    otherCurrency={currencies[Field.OUTPUT]}
                    id="swap-currency-input"
                  />

                  <AutoColumn justify="space-between">
                    <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
                      <IconButton variant="light" scale="sm">
                        <ArrowDownIcon
                          width="16px"
                          color={currencies[Field.INPUT] && currencies[Field.OUTPUT] ? 'primary' : 'text'}
                        />
                      </IconButton>
                      {recipient === null && !showWrap && isExpertMode ? (
                        <Button variant="text" id="add-recipient-button" onClick={() => onChangeRecipient('')}>
                          {t('+ Add a send (optional)')}
                        </Button>
                      ) : null}
                    </AutoRow>
                  </AutoColumn>

                  <CurrencyInputPanel
                    progressBar={progressBar}
                    value={formValue.output}
                    onUserInput={handleTypeOutput}
                    label={independentField === Field.INPUT && !showWrap && trade ? t('To (estimated)') : t('To')}
                    showMaxButton={false}
                    currency={currencies[Field.OUTPUT]}
                    onCurrencySelect={handleOutputSelect}
                    otherCurrency={currencies[Field.INPUT]}
                    id="swap-currency-output"
                    buyLimit={buyLimitSd}
                    filledSeeds={filledSeed}
                  />

                  {isExpertMode && recipient !== null && !showWrap ? (
                    <>
                      <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                        <ArrowWrapper clickable={false}>
                          <ArrowDownIcon width="16px" />
                        </ArrowWrapper>
                        <Button variant="text" id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                          {t('- Remove send')}
                        </Button>
                      </AutoRow>
                      <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
                    </>
                  ) : null}

                  {showWrap ? null : (
                    <AutoColumn gap="8px" style={{ padding: '0 16px' }}>
                      {Boolean(trade) && (
                        <RowBetween align="center">
                          <Label>{t('Price')}</Label>
                          <TradePrice
                            price={trade?.executionPrice}
                            showInverted={showInverted}
                            setShowInverted={setShowInverted}
                          />
                        </RowBetween>
                      )}
                      {allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE && (
                        <RowBetween align="center">
                          <Label>{t('Slippage Tolerance')}</Label>
                          <Text bold color="primary">
                            {allowedSlippage / 100}%
                          </Text>
                        </RowBetween>
                      )}
                    </AutoColumn>
                  )}
                </AutoColumn>
                <Box mt="1rem">
                  {swapIsUnsupported ? (
                    <Button width="100%" disabled mb="4px">
                      {t('Unsupported Asset')}
                    </Button>
                  ) : !account ? (
                    <ConnectWalletButton width="100%" />
                  ) : approval !== ApprovalState.APPROVED ? (
                    <RowBetween>
                      <Button variant="success" onClick={approveCallback} disabled={approvalSubmitted} width="48%">
                        {approval === ApprovalState.PENDING ? (
                          <AutoRow gap="6px" justify="center">
                            {t('Enabling')} <CircleLoader stroke="white" />
                          </AutoRow>
                        ) : approvalSubmitted ? (
                          t('Enabled')
                        ) : (
                          t('Enable %asset%', { asset: currencies[Field.INPUT]?.symbol ?? '' })
                        )}
                      </Button>
                      <Button
                        variant={isValid && priceImpactSeverity > 2 ? 'danger' : 'primary'}
                        onClick={() => {
                          if (isExpertMode) {
                            handleSwap()
                          } else {
                            setSwapState({
                              tradeToConfirm: trade,
                              attemptingTxn: false,
                              swapErrorMessage: undefined,
                              txHash: undefined,
                            })
                            onPresentConfirmModal()
                          }
                        }}
                        width="48%"
                        id="swap-button"
                        disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode)}
                      >
                        {t('Swap')}
                      </Button>
                    </RowBetween>
                  ) : (
                    <Button
                      variant={isValid && priceImpactSeverity > 2 && !swapCallbackError ? 'danger' : 'primary'}
                      onClick={() => {
                        if (true) {
                          handleSwap()
                        } else {
                          setSwapState({
                            tradeToConfirm: undefined,
                            attemptingTxn: false,
                            swapErrorMessage: undefined,
                            txHash: undefined,
                          })
                          onPresentConfirmModal()
                        }
                      }}
                      id="swap-button"
                      width="100%"
                      disabled={formValue.input < 0.01}
                    >
                      {t('Swap')}
                    </Button>
                  )}
                  {showApproveFlow && (
                    <Column style={{ marginTop: '1rem' }}>
                      <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />
                    </Column>
                  )}
                  {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
                </Box>
              </Wrapper>
            </AppBody>
            {!swapIsUnsupported ? (
              trade && <AdvancedSwapDetailsDropdown trade={trade} />
            ) : (
              <UnsupportedCurrencyFooter currencies={[currencies.INPUT, currencies.OUTPUT]} />
            )}
          </StyledInputCurrencyWrapper>
        </StyledSwapContainer>
        {isChartExpanded && (
          <Box display={['none', null, null, 'block']} width="100%" height="100%">
            <Footer variant="side" />
          </Box>
        )}
      </Flex>
    </Flex>
    // </Page>
  )
}
