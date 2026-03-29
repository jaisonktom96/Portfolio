import type { CaseStudyDetail } from '../types'
import { flowAnalytics } from './flowAnalytics'
import { futurestar } from './futurestar'
import { magicdiary } from './magicdiary'
import { testingFlows } from './testingFlows'

export const caseStudies: CaseStudyDetail[] = [
  magicdiary,
  testingFlows,
  flowAnalytics,
  futurestar,
]
