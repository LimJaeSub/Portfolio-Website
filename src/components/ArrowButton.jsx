function ArrowButton({ href, direction = 'down' }) {
  function scrollToSection() {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <button
      onClick={scrollToSection}
      className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all animate-bounce"
    >
      {direction === 'down' ? '↓' : '↑'}
    </button>
  )
}

export default ArrowButton