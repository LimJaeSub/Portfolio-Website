import Section from './Section'

const responsibilities = [
  'GS 인증 16건 진행',
  '시험당 평균 TC 180개 작성 & 결함 평균 20~30개 발견 및 회귀테스트',
  '메뉴 트리 기반 기능 테스트 및 Jmeter를 활용한 부하 테스트 수행',
  'Invicti 보안 스캔 - HSTS 설정 미흡, 구버전 소프트웨어, 쿠키 HttpOnly 미설정 등 보안 취약점 발견',
  '테스트 케이스 & 결함 리포트 excel로 작성하여 결함 추적',
]

const certifications = [
  {
    name: 'ISTQB CTFL',
    org: 'ISTQB',
    desc: '국제 소프트웨어 테스팅 자격증 Foundation Level',
  },
  {
    name: 'CSTS Foundation',
    org: 'TTA',
    desc: '한국 소프트웨어 테스팅 자격증 Foundation Level',
  },
]

function Experience() {
  return (
    <Section id="experience" label="Experience" title="경력 & 자격" prev="#mypage" next="#projects">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-8">
        {/* 경력 */}
        <div className="rounded-md bg-surface p-8 shadow-(--elev-sm)">
          <p className="mb-6 text-[11px] font-medium tracking-[0.1em] text-accent-700 uppercase dark:text-accent-300">
            Work Experience
          </p>
          <h3 className="text-[22px] leading-[1.12] font-medium tracking-[-0.015em]">
            한국정보통신기술협회 (TTA)
          </h3>
          <p className="mt-2 mb-8 text-[13px] text-text/55">
            소프트웨어 테스팅 엔지니어 · 2년
          </p>
          <ul className="flex flex-col gap-4">
            {responsibilities.map((item) => (
              <li key={item} className="flex gap-4 text-[13.5px] leading-[1.6] text-text/80">
                <span className="mt-[11px] h-px w-[14px] flex-none bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 자격증 */}
        <div className="flex flex-col gap-4">
          <p className="mb-2 text-[11px] font-medium tracking-[0.1em] text-accent-700 uppercase dark:text-accent-300">
            Certifications
          </p>
          {certifications.map((cert) => (
            <div key={cert.name} className="rounded-md bg-surface p-8 shadow-(--elev-sm)">
              <p className="text-[16px] font-medium">{cert.name}</p>
              <p className="mt-1 mb-2 text-[11px] tracking-[0.08em] text-accent-700 dark:text-accent-300">
                {cert.org}
              </p>
              <p className="text-[13.5px] text-text/70">{cert.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Experience
