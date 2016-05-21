export default [
	{
    type: 'list',
    name: 'frontend',
    message: 'App Frontend Framework',
    default: 'react',
    choices: [
    	'angular (not yet supported)',
    	'react',
    	'other'
    ]
  },
  {
    type: 'list',
    name: 'style',
    message: 'App Style Framework',
    default: 'foundation-apps',
    choices: [
    	'bootstrap (not yet supported)',
    	'foundation-apps',
    	'other',
    	'none'
    ]
  },
  {
    when: responses => {
      return responses['frontend'] == 'other'
    },
    name: 'frontend-other',
    message: 'What is the name of this frontend?'
  },
  {
    type: 'list',
    when: responses => {
      return responses['frontend'] == 'angular'
    },
    name: 'angular-version',
    message: 'What angular version do you want to use?',
    default: '2',
    choices: [
      '1 (not yet supported)',
      '2'
    ]
  },
  {
    when: responses => {
      return responses['style'] == 'other'
    },
    name: 'style-other',
    message: 'What is the name of this frontend?'
  },
]
