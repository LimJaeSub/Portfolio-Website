function ArrowButton({ href, direction = 'down' }) {
  function scrollToSection() {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToSection}
      aria-label={direction === 'down' ? '다음 섹션' : '이전 섹션'}
      className="flex h-[36px] w-[36px] animate-bounce items-center justify-center rounded-full border border-neutral-300 text-text/55 transition-colors hover:border-accent hover:text-accent dark:border-neutral-800"
    >
      {direction === 'down' ? '↓' : '↑'}
    </button>
  )
}

export default ArrowButton
