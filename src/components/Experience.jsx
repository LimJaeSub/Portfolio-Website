import ArrowButton from './ArrowButton'
function Experience() {
  return (
    <section
      id="experience"
      className="h-screen flex flex-col justify-center px-12 relative bg-gray-50 dark:bg-gray-800"
    >
        {/* 상단 화살표 */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2">
            <ArrowButton href="#mypage" direction="up" />
        </div>
      <p className="text-sm tracking-widest text-blue-600 font-medium uppercase mb-2">
        Experience
      </p>
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">
        경력 & 자격
      </h2>

      <div className="grid grid-cols-2 gap-8">

        {/* 왼쪽 - 경력 */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-8">
          <p className="text-xs tracking-widest text-blue-600 uppercase font-medium mb-4">
            Work Experience
          </p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            한국정보통신기술협회 (TTA)
          </h3>
          <p className="text-sm text-blue-600 mt-1 mb-1">
            소프트웨어 테스팅 엔지니어
          </p>
          <p className="text-xs text-gray-400 mb-6">
            2년
          </p>
          <ul className="flex flex-col gap-3">
            {[
              'GS 인증 테스트 케이스 설계 및 수행',
              '결함 리포팅 및 재현 시나리오 작성',
              '테스트 보고서 작성 및 인증 프로세스 지원',
            ].map((item) => (
              <li
                key={item}
                className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
              >
                <span className="text-blue-600 mt-0.5">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 오른쪽 - 자격증 */}
        <div className="flex flex-col gap-4">
          <p className="text-xs tracking-widest text-blue-600 uppercase font-medium">
            Certifications
          </p>
          {[
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
          ].map((cert) => (
            <div
              key={cert.name}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex items-start gap-4 hover:border-blue-400 transition-colors"
            >
              <span className="text-2xl">🏅</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {cert.name}
                </p>
                <p className="text-xs text-blue-600 mt-0.5 mb-1">{cert.org}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {cert.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

    {/* 아래 화살표 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <ArrowButton href="#experience" direction="down" />
      </div>
    </section>
  )
}

export default Experience