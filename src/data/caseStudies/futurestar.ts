import { futurestarAssets } from '../figma/futurestarAssets'
import type { CaseStudyDetail } from '../types'

/** Copy, structure, and assets aligned to Figma frame 2607:2210 (Futurestar User Research). */
export const futurestar: CaseStudyDetail = {
  id: 'futurestar',
  title: 'Futurestar User Research',
  description:
    'Finding difficulties students face in choosing a career path, and understanding perspectives of students, parents, and schools—mapping journeys and personas.',
  company: 'Futurestar',
  year: '2023',
  figmaDesignUrl:
    'https://www.figma.com/design/5BXKUo563G7chsvPVxTpxy/Portfolio?node-id=2607-2210&m=dev',
  summary:
    'Research plan with purpose and objectives; semi-structured interviews via Google Meet; thematic analysis and affinity mapping; student and parent personas, journey mapping, and focus scenarios.',
  context: [],
  role: 'User Researcher',
  meta: {
    industry: 'Edtech / career discovery',
    timeline: '2 months',
    scope: 'Students, parents, educators, school management',
    collaboration: 'Stakeholder readouts and design handoff',
    team: 'Myself and a User Research Intern',
  },
  keyMetrics: [
    { value: '8', label: 'Semi-structured interviews' },
    { value: '8', label: 'Participants (segmented)' },
    { value: '3', label: 'Personas' },
  ],
  metaLayout: 'strip3',
  heroArt: [{ src: futurestarAssets.heroBanner, alt: 'Futurestar wordmark on purple gradient' }],
  heroArtLayout: 'wide',
  sections: [
    {
      title: 'Research Plan',
      paragraphs: [
        'The study began with preparing the research plan, in which the purpose, objectives, method, participant segmentation were planned out and allocating time for each activity.',
      ],
      subsections: [
        {
          title: 'Purpose',
          paragraphs: [
            'The purpose of this study was to find out the difficulties faced by students in identifying the career path of their interest. We also want to understand the perspective of students, parents, and schools and identify the journey and personas involved in this problem.',
          ],
        },
        {
          title: 'Research objectives',
          blocks: [
            {
              type: 'cardRow',
              cards: [
                {
                  title: 'Perspective on career decision',
                  body:
                    'Understanding the perspective of students and parents regarding the importance of career decisions, and why they think so. Understanding what students and parents are looking for, in a career (salary, scope, job satisfaction etc). Understanding the students and parents perspective regarding when to get a clarity on career choice (At what age?)',
                },
                {
                  title: 'Career awareness:',
                  body:
                    'What all career choices are the students/ parents aware about? Understanding their perspective on importance to know various careers before making a choice. Understanding the type of information they’re looking for wrt various careers. Understanding the priority of career awareness if needed, in midst of their homeworks and classes',
                },
                {
                  title: 'Clarity on career',
                  body:
                    'Does the student have a clarity on what to pursue as a career? If yes, when did they achieve this clarity and how? If no, their concerns. Understanding the perspective of parent if the student is having less clarity on career. Understanding if students/parents explore all possible career options/know the true story in industry, before making the career decision? If yes, how? If no, are they interested, and their concerns. Know the amount of understanding that students and parents have incase they have clarity on career. To check if they’re interested in knowing more, or their concerns',
                },
                {
                  title: 'Identifying areas of interest:',
                  body:
                    'Understanding if the students and parents have a clarity on areas of interest of the student and if they think of careers related on the areas of interests',
                },
                {
                  title: 'Identifying other factors',
                  body:
                    'Identifying whether academic performance is a factor. Time available for stakeholders. Information consumption in stakeholders',
                },
              ],
            },
          ],
        },
        {
          title: 'Method',
          paragraphs: [
            'Conducting semi-structured interviews with people from our target group, through online tool such as Google Meet',
          ],
        },
        {
          title: 'Participants',
          paragraphs: [
            'A total of 8 participants. Further divisions are mentioned in the table below:',
          ],
          blocks: [
            {
              type: 'table',
              headers: ['Segmentation Criteria', 'No.of participants'],
              rows: [
                ['Urban Family', '3'],
                ['Semi urban family', '3'],
                ['Rural family', '2'],
                ['Parent [Post graduate/Highly educated]', '3'],
                ['Average educated Parent [Graduate]', '3'],
                ['Very less educated parent [<10th]', '2'],
                ['Student high academic performance', '3'],
                ['Student medium academic performance', '3'],
                ['Student low academic performance', '2'],
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Interviews & Synthesis',
      paragraphs: [
        'We conducted 8 semi-structured interviews, each of around 45mins-1hour. In order to do this, we created discussion guides for students, school management, parents and educators, and went ahead with online interviews through Google Meet.',
        'We then performed a thematic analysis on the data and tagged into relevant groups.',
      ],
      blocks: [
        {
          type: 'figure',
          src: futurestarAssets.interviewsSynthesis,
          alt: 'Thematic synthesis table: observations, quotes, themes, and categories',
          caption: 'Tool used: Optimal Workshop',
          preserveImageQuality: true,
        },
      ],
    },
    {
      title: 'Analysis',
      paragraphs: [
        'We did an affinity mapping based on the synthesised data. Through this exercise we were able to bring out the influences, pain points and other important factors.',
      ],
      blocks: [
        {
          type: 'figure',
          src: futurestarAssets.affinityMapping,
          alt: 'Affinity mapping clusters from synthesised interview data',
          preserveImageQuality: true,
        },
        {
          type: 'figure',
          src: futurestarAssets.analysisBoard,
          alt: 'Organised affinity mapping board with grouped themes',
          preserveImageQuality: true,
        },
      ],
    },
    {
      title: 'User Persona and Journey Mapping',
      paragraphs: [
        'We identified 3 persona, of which 2 were of parents and one of student.',
      ],
      subsections: [
        {
          title: 'Student persona & Journey',
          blocks: [
            {
              type: 'figure',
              src: futurestarAssets.studentPersona,
              alt: 'Student persona overview',
              preserveImageQuality: true,
            },
            {
              type: 'figure',
              src: futurestarAssets.studentJourney,
              alt: 'Student journey map',
              preserveImageQuality: true,
            },
          ],
        },
        {
          title: 'Parent personas',
          blocks: [
            {
              type: 'figure',
              src: futurestarAssets.parentPersonaOne,
              alt: 'First parent persona',
              preserveImageQuality: true,
            },
            {
              type: 'figure',
              src: futurestarAssets.parentPersonaTwo,
              alt: 'Second parent persona',
              preserveImageQuality: true,
            },
          ],
        },
        {
          title: 'Type of combinations & Focus',
          paragraphs: [
            'We identified the various combinations of scenarios and the ideal scenario to target.',
          ],
          blocks: [
            {
              type: 'figure',
              src: futurestarAssets.combinationsFocus,
              alt: 'Scenario combinations and focus areas',
              preserveImageQuality: true,
            },
            {
              type: 'figure',
              src: futurestarAssets.closingPhoto,
              alt: 'Closing visual',
            },
          ],
        },
      ],
    },
  ],
}
