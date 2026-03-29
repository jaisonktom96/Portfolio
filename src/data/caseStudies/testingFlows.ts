import type { CaseStudyDetail } from '../types'
import { testingFlowsAssets as A } from '../figma/testingFlowsAssets'

/** Testing of Flows — MoEngage journey testing. Copy, structure, and assets aligned to Figma frame 2607:1785. */
export const testingFlows: CaseStudyDetail = {
  id: 'testing-of-flows',
  title: 'Testing of Flows',
  description:
    'Designing a testing experience from scratch, for marketers to test the customer orchestration journey in a customer engagement platform.',
  tag: 'First in industry.',
  company: 'MoEngage',
  year: '2024',
  figmaDesignUrl:
    'https://www.figma.com/design/5BXKUo563G7chsvPVxTpxy/Portfolio?node-id=2607-1785&m=dev',
  metaLayout: 'strip3',
  heroArtLayout: 'wide',
  heroArt: [
    {
      src: A.heroFlowUi,
      alt: 'MoEngage Flows canvas — event check branch and staged journey sidebar',
    },
  ],
  summary:
    'MoEngage Flows lets marketers orchestrate omnichannel journeys. Marketers need to validate logic before publish—but manual self-testing breaks down for heavy events (KYC, purchase). I led research synthesis, problem validation, and UI for in-product testing: test users, simulated events, stage-by-stage checks, and readable results so teams could ship journeys with confidence.',
  context: [],
  role:
    'Analysing research data, Secondary research, Problem validation, Problem definition, UI design, Prototyping, Developer Handoff',
  meta: {
    industry: 'B2B SaaS — customer engagement / journey orchestration (MoEngage)',
    timeline: '3 months',
    scope:
      'End-to-end testing experience: validation research, competitor analogies, flows for stage-wise and full-flow testing, usability iterations',
    collaboration:
      'Partnership with PM, engineering (execution semantics, traces), customer success, and design systems',
    team: 'Myself, Senior Product Designer, PM and Developer',
  },
  keyMetrics: [
    { value: '88%', label: 'Marketers test flows before publishing (survey)' },
    { value: '200+', label: 'Customer tickets analysed for testing themes' },
    { value: '43', label: 'Pendo upvotes from clients (combined MRR signal)' },
  ],
  sections: [
    {
      title: 'Project Overview',
      paragraphs: [
        'MoEngage Flows is a cross-platform omnichannel marketing tool (with channels like email, sms, push etc) that helps marketers provide a comprehensive customer experience for their end users and drive customer engagement. A flow is essentially a strategy with a set of communications (email, sms, push etc) that will be sent according to the behaviour/attribute of the end user.',
        'With Flows, marketers can have an omnichannel marketing strategy instead of using multiple channels disjointly.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.omnichannelDiagram,
          alt: 'Omnichannel Flows diagram — analyse, engage, and measure across channels',
        },
      ],
    },
    {
      title: 'Kick off',
      paragraphs: [
        'For a marketer, every single interaction with their customer is highly important, as conversion can happen at any step. It is also important not to spam their customers with repeated communications. Hence marketers are very keen on making every interaction right. After configuring a flow, the marketer tests the flow to make sure that everything works perfectly before publishing it.',
      ],
      blocks: [
        {
          type: 'figureRow',
          items: [
            { src: A.kickoffWorkspace, alt: 'Marketer testing a flow on laptop in a café setting' },
            { src: A.kickoffScreenOverlay, alt: 'Flow builder UI overlay — test journey on canvas' },
          ],
        },
      ],
    },
    {
      title: 'Limits of manual testing',
      paragraphs: [
        'Many marketers were testing their flows manually, by entering themselves into the flow and performing events (eg. Opening App, Adding to cart etc). But performing events like completing KYC, purchasing a product etc was not practical.',
      ],
    },
    {
      title: 'Problem Validation',
      paragraphs: [
        'We validated the problem using multiple tools, such as Pendo upvotes, Customer tickets and Primary research.',
      ],
      blocks: [
        {
          type: 'cardRow',
          cards: [
            {
              title: 'Pendo Upvotes',
              body: '43 upvotes from clients with total MRR of $1,29,239 · PM',
            },
            {
              title: 'Surveys & Interviews',
              body: '8 Marketers; 11 Customer Success Managers handling 51 Clients · PM & Design',
            },
            {
              title: 'Customer Tickets',
              body: '200+ Customer Tickets · Design',
            },
          ],
        },
        {
          type: 'cardRow',
          cards: [
            {
              title: '88%',
              body: 'marketers test flows before publishing',
              imageSrc: A.surveyDonut88,
              imageAlt: 'Survey — 88% of marketers test flows before publishing',
            },
            {
              title: '62.5%',
              body: 'marketers test all stages while remaining 37.5% test just communications',
              imageSrc: A.surveyDonut625,
              imageAlt: 'Survey — 62.5% test all stages',
            },
            {
              title: '65%',
              body: 'marketers spend more than 60 mins in testing',
              imageSrc: A.surveyDonut65,
              imageAlt: 'Survey — 65% spend over 60 minutes testing',
            },
          ],
        },
      ],
    },
    {
      title: 'Analysing Customer Tickets',
      paragraphs: [
        'We analysed 100+ customer tickets that our PM had shortlisted around testing feature, and performed affinity mapping them to get deeper insights.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.affinityMapping,
          alt: 'Affinity mapping — logic creation, understanding, confidence, and information themes',
        },
        {
          type: 'figure',
          src: A.analysingTicketsPhoto,
          alt: 'Focused work while reviewing customer issues and flow logic',
        },
      ],
    },
    {
      title: 'What the tickets pointed to',
      paragraphs: [
        'Majority of issues were under logic creation and we understood that marketers had a hard time in configuring the right logic according to what they had in mind.',
        'There were also issues due to lack of understanding, lack of information and lack of self confidence which helped us to give importance to these aspects and convince stakeholders while designing.',
      ],
    },
    {
      title: 'Mapping tickets to Customer Journey',
      paragraphs: [
        'We mapped the customer tickets with respective to the stage at which the customer faced that problem.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.journeyMap,
          alt: 'Journey map — marketer flow from goals through implementation and analysis',
        },
      ],
    },
    {
      title: 'Stage-wise testing opportunity',
      paragraphs: [
        'We discovered that a lot of issues occured while users implement a strategy. ie. While configuring a flow. Hence we identified the scope for a stage-wise testing which can quickly test each stage when the marketer configures the flow. Once the marketers finish configuring the flow, they can test the whole flow before publishing. Other insights were as follows:',
      ],
      blocks: [
        {
          type: 'cardRow',
          cards: [
            {
              title: 'Best logic',
              body: 'Marketers want to identify the best logic that can work for their usecase',
            },
            {
              title: 'Action outcomes',
              body: 'Marketers want to understand what happens when a user takes an action',
            },
            {
              title: 'Mistakes in creation',
              body: 'Marketers want to identify the logical mistakes during flow creation',
            },
          ],
        },
        {
          type: 'cardRow',
          cards: [
            {
              title: 'Volume before publish',
              body: 'Marketers want to understand the volume/number of users that would enter a flow using the logic they have created (before publishing)',
            },
            {
              title: 'Drop-offs after publish',
              body: 'Marketers wants to understand the reasons that stops users from entering the flow (after publishing)',
            },
            {
              title: 'Visualise strategy',
              body: 'Marketers want to visualise the logic for achieving the target that they have in mind',
            },
          ],
        },
      ],
    },
    {
      title: 'How might we solve these?',
      paragraphs: [
        'We came up with how might we statements inorder to solve the above issues:',
      ],
      blocks: [
        {
          type: 'cardRow',
          cards: [
            {
              title: 'Entry volume',
              body: 'How might we help the marketers to visualise the volume of users entering a stage, so that they are aware of the effect of logic on entry of users?',
            },
            {
              title: 'Logical mistakes',
              body: 'In what ways could marketers identify the logical mistakes that may lead to an unexpected behaviour, so that they can avoid making that error?',
            },
            {
              title: 'Unexpected behaviour',
              body: 'In what ways might we help the marketers to understand the reason for an unexpected behavior, so that they can make changes (after publishing)?',
            },
            {
              title: 'Target logic',
              body: 'How might we help the marketers to visualise the logic for the corresponding target that they have in mind',
            },
            {
              title: 'Choosing logic',
              body: 'In what ways can we help the marketers to choose the best logic among all the logics?',
            },
          ],
        },
      ],
    },
    {
      title: 'Competitor Analysis',
      paragraphs: [
        'Since this was a concept that was first of its kind in the industry, we didn’t had anything much to look at. Hence we looked at analogies on how similar problems are addressed in other industries. We looked at testing experiences of electrical circuits where the circuit has multiple elements and the testing is done for each element one by one.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.competitorAnalogyPhoto,
          alt: 'Electrical systems analogy — complex circuits tested element by element',
        },
        {
          type: 'table',
          caption: 'Cross-industry tools compared by layout, modes, flexibility, run history, and diagnostics.',
          headers: [
            'Aspect → Tool',
            'UI Layout',
            'Testing modes',
            'Testing flexibility',
            'Test Run details',
            'Issue Reporting',
          ],
          rows: [
            [
              'Easy EDA',
              '3 Panel layout — Flow in centre, left panel for adding elements from inventory, right panel for editing characteristics of selected elements',
              'Manual Only',
              'Tests single stage at a time. The errors of the tested stage has to be corrected for knowing the errors in further stages.',
              'Test run data not stored',
              'Reports issues in detail as well as shows ways of fixing them',
            ],
            [
              'MATLAB',
              'Separate windows for Flows, adding elements and test results. Users have to arrange the windows according to their needs',
              'Manual Only',
              'Tests single stage at a time. The errors of the tested stage has to be corrected for knowing the errors in further stages.',
              'Test run data not stored',
              'Data not available for error scenario',
            ],
            [
              'Microsoft Flows',
              '3 Panel layout — Flow in centre, left panel for dashboard menu, right panel for test results',
              'Manual + Automated (based on data from previous test runs)',
              'Tests single stage at a time. Data not available (supports testing of multiple users or not)',
              'Test run history present — Testing of each stages shown realtime',
              'Reports issues in detail as well as shows ways of fixing them — Provides link to help docs',
            ],
          ],
        },
        {
          type: 'figureRow',
          items: [
            { src: A.competitorEasyEda, alt: 'Easy EDA — schematic layout with inventory and properties panels' },
            { src: A.competitorMatlab, alt: 'MATLAB — block diagram testing windows' },
            { src: A.competitorMicrosoftFlows, alt: 'Microsoft Power Automate — flow run and test UI' },
          ],
          caption: 'Reference UIs that informed layout, run history, and diagnostics patterns.',
        },
      ],
    },
    {
      title: 'Problem definition',
      paragraphs: [
        'Designing a testing experience for marketers so that they can quickly test each stage while configuring those, and test the whole flow considering all interdependencies of stages, so that they can gauge volume of users, identify logical mistakes, understand reasons for errors, and visualise the movement of users within the flow.',
      ],
    },
    {
      title: 'User Flow',
      paragraphs: [
        'We came up with user flow for stagewise testing as well as single stage testing.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.userFlowDiagram,
          alt: 'User flow — flow creation through staging, simulation, and satisfaction loops',
        },
      ],
    },
    {
      title: 'Brainstorming',
      blocks: [
        {
          type: 'figureRow',
          items: [
            { src: A.brainstormA, alt: 'Brainstorm — test info and simulative configuration' },
            { src: A.brainstormB, alt: 'Brainstorm — canvas entry conditions and audience' },
            { src: A.brainstormC, alt: 'Brainstorm — user path timeline and condition editor' },
            { src: A.brainstormD, alt: 'Brainstorm — stacked exploration screens' },
          ],
          caption: 'Explorations across test setup, canvas context, and path visualisation.',
        },
      ],
    },
    {
      title: 'How we designed the Testing experience',
      blocks: [
        {
          type: 'figure',
          src: A.puppetMetaphor,
          alt: 'Puppetry metaphor for marketer-controlled test users',
          caption:
            'The testing experience is similar to this puppetry, where the test user being the puppet, and marketer being the person controlling the puppet, performs actions on behalf of the test user, and see how the user moves in the flow.',
        },
      ],
    },
    {
      title: 'The marketer adds a test user with pre-defined attributes',
      paragraphs: [
        'The events performed are on behalf of this test user. The attributes of the test user influences testing. For eg: If the Life Time Value(LTV) of the test user is ₹1000, and the flow configuration is in such a way that it only allows users with LTV>1000, the test user won’t enter the flow.',
        'Also, the system performs a reachability check to see if the test user is reachable on all channels used in the flow during configuration.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.uiTestUser,
          alt: 'UI — add test user, channels, and reachability before running tests',
        },
      ],
    },
    {
      title: 'Events are then simulated on behalf of the test user',
      paragraphs: [
        'Events can either be simulated inside system or simulated by performing actions in external devices such as mobile phones. System simulation helps in simulating events that are difficult to perform in real life, such as completing KYC, purchasing a product etc.',
        'The attributes of the test user might get modified temporarily during testing. For eg: If the Life Time Value(LTV) of the test user is ₹1000, and the flow configuration is in such a way that it only allows users with LTV>1000, the test user won’t enter the flow.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.uiSimulateEvents,
          alt: 'UI — simulate events and target audience configuration on the flow canvas',
        },
      ],
    },
    {
      title: 'After simulating events, marketer tests the stage and see results',
      paragraphs: [
        'During testing, the system performs a check to match the configured conditions with respect to simulated conditions.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.uiStageResults,
          alt: 'UI — stage test results after simulated events',
        },
      ],
    },
    {
      title: 'Visualising user movement',
      paragraphs: [
        'Marketers see the path of user moving through the flow, so that they can make corrections is they don’t see the desired movement.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.uiUserPathMovement,
          alt: 'UI — user path playback and movement through flow stages',
        },
      ],
    },
    {
      title: '12 stages with unique ways to test',
      paragraphs: [
        'There are 12 types of stages, including Condition stages (Tested by simulating events), Actions stages (Tested by sending campaigns) and Controls (Tested by input of values). Due to completely different usecases and since it’ll become huge to show all of that, I’m not showing all the usecases here.',
      ],
    },
    {
      title: 'Usability Testing',
      paragraphs: [
        'In our initial walkthroughs, users perceived the intuitiveness of the solution to be somewhat average and rated it 3 out of 5 (4 participants). We wanted to be sure that the solution is usable and intuitive, hence we conducted another round of task based usability testing after making changes on the initial design.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.usabilityPortrait,
          alt: 'Participant reflecting during usability sessions',
          size: 'small',
        },
      ],
    },
    {
      title: 'Task based testing',
      paragraphs: [
        'Participants were first shown a dummy flow which they had to share their understanding, and then they were asked about different ways that they would test the flow. Post the brief questionnaire, the prototype link was shared with the participants, and they were asked to perform the following tasks:',
      ],
      bullets: [
        'Testing of a user flowing through an event check stage',
        'Testing of campaign configuration as per user attributes',
      ],
    },
    {
      title: 'Results',
      blocks: [
        {
          type: 'table',
          headers: ['Task', 'Completion rate', 'Average time', 'Avg. Number of errors'],
          rows: [
            [
              'Testing the journey of a user by testing events performed by the user',
              '100%',
              '13 minutes 39 seconds +/- 5:51',
              '0.75',
            ],
            [
              'Testing campaigns to be sent to a particular user',
              '100%',
              '1 minute 05 seconds',
              '0',
            ],
          ],
        },
      ],
    },
    {
      title: 'Improvements made',
      blocks: [
        {
          type: 'beforeAfter',
          title:
            'Issue 1: Users unintentionally clicking on ‘Test’ though they wanted to simulate events before testing',
          before: {
            src: A.improveIssue1Before,
            alt: 'Before — simulate events vs test affordances',
            label: 'Before testing',
          },
          after: {
            src: A.improveIssue1After,
            alt: 'After — explicit choice to simulate events or test without simulating',
            label: 'After Improvement',
          },
        },
        {
          type: 'beforeAfter',
          title:
            'Issue 2: Some users found it difficulty in understanding the stage for which the condition was defined.',
          before: {
            src: A.improveIssue2Before,
            alt: 'Before — current stage copy for conditions',
            label: 'Before testing',
          },
          after: {
            src: A.improveIssue2After,
            alt: 'After — stage chip clarifying which step conditions belong to',
            label: 'After Improvement',
          },
        },
        {
          type: 'beforeAfter',
          title: 'Issue 3: Users found it difficult to understand the ‘Execute this event’ field.',
          before: {
            src: A.improveIssue3Before,
            alt: 'Before — execute this event label',
            label: 'Before testing',
          },
          after: {
            src: A.improveIssue3After,
            alt: 'After — time to execute event with helper copy',
            label: 'After Improvement',
          },
        },
      ],
    },
    {
      title: 'Outcomes',
      paragraphs: [
        'We got an overall rating of 4/5 for the redesigned experience and went ahead with development.',
      ],
      blocks: [
        {
          type: 'figure',
          src: A.closingThanks,
          alt: 'Thanks card — closing the case study narrative',
        },
      ],
    },
  ],
}
