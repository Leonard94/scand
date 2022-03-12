const level = document.querySelectorAll('.level')

level.forEach((item) => {
    item.addEventListener('click', (e) => {
        if (e.target.nodeName === 'svg' || e.target.nodeName === 'path') {
            item.className === 'level level--completed' ? item.classList.remove('level--completed') : item.classList.add('level--completed')
        }
    })
})
