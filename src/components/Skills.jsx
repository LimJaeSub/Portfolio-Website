import ArrowButton from './ArrowButton'

const skills = [
  {
    category: 'Test Automation',
    items: ['Selenium WebDriver', 'Playwright', 'pytest', 'POM 패턴'],
  },
  {
    category: 'CI/CD & Reporting',
    items: ['GitHub Actions', 'Allure Report'],
  },
  {
    category: 'API & Performance',
    items: ['requests (Python)', 'Postman', 'JMeter'],
  },
  {
    category: 'QA & 협업 도구',
    items: ['Jira (Scrum)', 'Confluence'],
  },
  {
    category: 'Language',
    items: ['Python', 'Java (기초)', 'HTML / CSS / Javascript'],
  },
]

function Skills() {
  return (
    <section
      id="skills"
      className="h-screen flex flex-col justify-center px-12 relative bg-gray-50 dark:bg-gray-800"
    >
      <p className="text-sm tracking-widest text-blue-600 font-medium uppercase mb-2">
        Skills
      </p>
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">
        기술 스택
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {skills.map((skill) => (
          <div
            key={skill.category}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-blue-400 transition-colors"
          >
            <p className="text-xs tracking-widest text-blue-600 uppercase font-medium mb-4">
              {skill.category}
            </p>
            <ul className="flex flex-col gap-2">
              {skill.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 위 화살표 */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2">
        <ArrowButton href="#projects" direction="up" />
      </div>

    </section>
  )
}

export default Skills