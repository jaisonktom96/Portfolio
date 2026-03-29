import type { CaseStudyDetail } from '../types'
import { flowAnalyticsAssets as A } from '../figma/flowAnalyticsAssets'

/** Flow Analytics Revamp — MoEngage. Copy, structure, and assets aligned to Figma frame 2607:2048. */
export const flowAnalytics: CaseStudyDetail = {
  id: 'flow-analytics',
  title: 'Flow Analytics Revamp',
  description:
    'Redesigning Flow analytics to reduce time to insights and bring analysis users were doing outside the dashboard into the product.',
  tag: 'First of its kind in Industry.',
  company: 'MoEngage',
  year: '2024',
  figmaDesignUrl:
    'https://www.figma.com/design/5BXKUo563G7chsvPVxTpxy/Portfolio?node-id=2607-2048&m=dev',
  metaLayout: 'strip3',
  heroArtLayout: 'wide',
  heroArt: [
    {
      src: A.heroDashboard,
      alt: 'Flow Analytics — bar chart comparing trips, conversions, and revenue across flow stages',
    },
  ],
  summary:
    'MoEngage Flows is an omni-channel journey builder: once a flow is live, marketers need analytics that match how they think about journeys—not just channel stats. I led research synthesis, problem validation, and UI for a Flow Analytics revamp: clearer performance, comparisons, retention, and cohort views so teams could get to answers without exporting to spreadsheets or third-party tools.',
  context: [],
  role:
    'Analysing research data, Secondary research, Problem validation, Problem definition, UI design, Prototyping, Developer Handoff',
  meta: {
    industry: 'B2B SaaS — customer engagement (MoEngage)',
    timeline: '2 months',
    scope:
      'End-to-end Flow Analytics experience: research, ticket mapping, ideation, and high-fidelity dashboard UX',
    collaboration: 'Senior Product Designer, PM, and engineering partners',
    team: 'Myself, Senior Product Designer, PM and Developer',
  },
  keyMetrics: [
    { value: '2.5/5', label: 'Internal survey rating (analytics)' },
    { value: '50+', label: 'Customer tickets analysed' },
    { value: '5', label: 'User interviews (problem validation)' },
  ],
  sections: [
    {
      title: 'MoEngage Flow Analytics',
      paragraphs: [
        'MoEngage Flows is a cross-platform omni-channel marketing tool (with channels like email, sms, push etc) that helps marketers provide a comprehensive customer experience for their end users and drive customer engagement. A flow is essentially a strategy with a set of communications (email, sms, push etc) that will be sent according to the behaviour/attribute of the end user.',
        'Once a flow is configured and published, campaigns start getting delivered across the devices of end users, and data starts getting populated in the analytics dashboard. We wanted to redesign the analytics experience in order to reduce the time to insights, and incorporate more functionalities that the users were already doing outside of the analytics dashboard.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.overviewGif,
          alt: 'Flow Analytics interface walkthrough — stats and journey performance',
        },
      ],
    },
    {
      title: 'Kick Off',
      paragraphs: [
        'We conducted customer calls along with the PM to understand how customers (marketers) analyse their flows. We came to know that they find limitations in current analytics and use different tools such as Excel, Google analytics, MoEngage User Paths etc to perform more analysis outside of our dashboard.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.kickOffPhoto,
          alt: 'Customer discovery call — two people discussing analytics at a desk',
        },
      ],
    },
    {
      title: 'Problem Validation',
      paragraphs: [
        'Customers rated the analytics as 2.5 on a scale of 5 in our internal survey. This along with 5 user interviews helped us understand the major issues and validated the need to improve the Flow analytics. We also looked at existing tickets related to flow analytics and validated the need for improvement.',
      ],
    },
    {
      title: 'Analysing Customer Tickets and its Mapping',
      paragraphs: [
        'We analysed 50+ customer tickets around analytics, performed an affinity mapping and mapped them to the user journey to understand the areas to solve for.',
        'Confusion and cumbersomeness were the top emotions that users felt while analysing their flows. We hence made this as our design goals to reduce confusion, reduce cumbersomeness, and reduce the time to insights.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.affinityMapping,
          alt: 'Affinity mapping — marketer user journey when analysing flows',
        },
      ],
    },
    {
      title: 'How do users analyse flows ?',
      paragraphs: [
        'Marketers first check their metrics in MoEngage Flow Analytics dashboard, where they check the flow performance (Total users entering the flow, engagement, conversion etc), performance of individual channels (email, push, sms etc), performance of individual campaigns, and errors if any.',
        'They also perform further analysis on top of this data using external tools, or tools inside MoEngage, outside of Flows.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.flowPerformanceDashboard,
          alt: 'MoEngage Flow Analytics — flow performance metrics and time series',
        },
        {
          type: 'figure',
          src: A.externalAnalysisPhoto,
          alt: 'Marketer analysing charts on a laptop',
        },
        {
          type: 'cardRow',
          cards: [
            {
              title: 'Weekly metrics',
              body: 'Manually collecting the metrics for all their Flows week-on-week and comparing them with the past trends',
            },
            {
              title: 'Spreadsheets',
              body: 'Creating waterfalls in Gsheets or Excels based on the data they receive from the canvas',
            },
            {
              title: 'Other analytics tools',
              body: 'Using additional tools like Amplitude, Mixpanel, and Google Analytics for better analysis',
            },
            {
              title: 'Other MoEngage features',
              body: 'Using other features within MoE like Funnels, Behaviour, or User Paths to analyse a flow',
            },
          ],
        },
      ],
    },
    {
      title: 'Problem Breakdown',
      blocks: [
        {
          type: 'table',
          headers: ['User', 'wants to...', 'so that...', 'Challenges in achieving goal'],
          rows: [
            [
              'Marketer',
              'Understand the details of engagement of the flow with the target users quickly and understand reasons for disengagement if any',
              'They can easily validate the level of resonance of content with their users',
              'Content within campaigns is not available upfront when looking at flow stats. The way the stats content is displayed is difficult, to easily get a clear understanding. All the stats are not always relevant to all the users at a given time.',
            ],
            [
              'Marketer',
              'Understand the performance of a running flow.',
              'They can quickly validate if their strategy is working as expected.',
              'Validation can be time consuming. If issues arise, identifying and resolving issues takes a lot of time',
            ],
            [
              'Marketer',
              'Understand the reason behind the value of certain metrics for a flow',
              'They can achieve their marketing goals by understanding and then resolving issues in their marketing strategy.',
              'Generating insights from stats can be time consuming. If the metrics don’t have expected values, identifying and resolving issues takes a lot of time',
            ],
            [
              'Marketer',
              'Compare their metrics with: Their own best performing flows average; Industry average',
              'They can understand the factors that affect the performance of a flow and adjust the flow accordingly.',
              'Comparison is cumbersome for similar flows. No way to compare directly with industry average',
            ],
            [
              'Marketer',
              'Understand the efficacy of marketing strategies towards marketing goals of the firm.',
              'They can track progress towards marketing goals and strategize as per the progress towards those goals',
              'No way to track progress towards marketing goals',
            ],
          ],
        },
      ],
    },
    {
      title: 'How might we',
      paragraphs: [
        'After a round of discussion with the senior designer and PM, we eliminated some issues that were not in scope, and later conducted a whiteboarding session to understand how might we solve those. The issues that were considered for the whiteboarding activity were:',
      ],
      blocks: [
        {
          type: 'cardRow',
          cards: [
            {
              title:
                'How might we help marketers understand the details of engagement/ disengagement?',
              body: '',
            },
            {
              title:
                'How might we make it easy for marketers to understand the demographic correlations?',
              body: '',
            },
            {
              title: 'How might we help marketers to retarget certain users/experiment?',
              body: '',
            },
            {
              title:
                'How might we help marketers to compare the performance of flows with past performance?',
              body: '',
            },
          ],
        },
        {
          type: 'figureRow',
          items: [
            { src: A.whiteboardA, alt: 'Whiteboarding session — notes and diagrams on a whiteboard' },
            { src: A.whiteboardB, alt: 'Whiteboarding session — flow and metrics sketch' },
            { src: A.whiteboardC, alt: 'Whiteboarding session — problem framing and ideas' },
          ],
          caption: 'Whiteboarding session with Senior Product Designer and PM.',
        },
      ],
    },
    {
      title: 'Ideation',
      blocks: [
        {
          type: 'figureRow',
          items: [
            {
              src: A.ideationCollageA,
              alt: 'Ideation — dashboard metrics and flow performance concepts',
            },
            {
              src: A.ideationCollageB,
              alt: 'Ideation — bar charts and goal tracking explorations',
            },
            {
              src: A.ideationCollageC,
              alt: 'Ideation — date range and filter interactions',
            },
          ],
          caption: 'Exploring charts, filters, and layout directions before high fidelity.',
        },
      ],
    },
    {
      title: 'Highlighting stages (First of its kind in Industry)',
      paragraphs: [
        'Marketers can now highlight the stages based on their metrics such as CVR, CTR, Drop offs and also see the most common path that their users traverse. This helps them to identify patterns of good/poor performance.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.hiFiHighlightingStages,
          alt: 'High fidelity — highlighting stages and common paths in Flow Analytics',
        },
      ],
    },
    {
      title: 'Flow performance',
      paragraphs: [
        'The marketers see the performance of the flow. They also have an option to compare the performance with past performance. They have an option to view these in line charts and table as well.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.hiFiFlowPerformance,
          alt: 'High fidelity — flow performance charts and comparison',
        },
      ],
    },
    {
      title: 'Campaign performance',
      paragraphs: [
        'The marketers can compare the performance of different channels. They can also visualise the past performance.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.hiFiCampaignPerformance,
          alt: 'High fidelity — campaign performance across channels',
        },
      ],
    },
    {
      title: 'Retention Analysis',
      paragraphs: [
        'If the marketing department spends a lot to acquire users who are likely to leave, their customer lifetime value (LTV), might be lower than their acquisition cost. The app will fail If the company continues to spend more on acquisitions than the LTV of customers, and hence it was important for marketers to answer the question “How many of our customers return to the product?”',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.hiFiRetention,
          alt: 'High fidelity — retention analysis and cohort-style retention view',
        },
      ],
    },
    {
      title: 'Cohort Analysis',
      paragraphs: [
        'Marketers can create cohorts and analyse the Flow to understand the performance of various cohorts with respect to flow metrics. This helps Marketers arrive at conclusions like ‘Users of age range 29-52 convert quickly when compared to the rest of the users.’',
        'Marketers also have an option to retarget their users by creating new segments directly by clicking on the charts.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.hiFiCohort,
          alt: 'High fidelity — cohort analysis and segment breakdown',
        },
      ],
    },
    {
      title: 'Usability Testing',
      paragraphs: [
        'The designs were tested with 3 marketers. The designs were presented over screensharing (Google Meet), and the participants were asked to interpret the data. All the participants found it easy to understand and found the new features extremely valuable.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.usabilityClosing,
          alt: 'Closing visual — thanks note on desk after usability sessions',
        },
      ],
    },
  ],
}
