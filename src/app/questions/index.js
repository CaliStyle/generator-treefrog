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
    choices: [
      '2'
    ]
  }
]
