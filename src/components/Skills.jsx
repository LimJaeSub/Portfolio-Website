import Section from './Section'

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
    <Section id="skills" label="Skills" title="기술 스택" prev="#projects">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
        {skills.map((skill) => (
          <div key={skill.category} className="rounded-md bg-surface p-8 shadow-(--elev-sm)">
            <p className="mb-5 text-[11px] font-medium tracking-[0.1em] text-accent-700 uppercase dark:text-accent-300">
              {skill.category}
            </p>
            <ul className="flex flex-col gap-3 text-[13.5px] text-text/80">
              {skill.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Skills
