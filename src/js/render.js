const setButton = document.getElementById('btn')
const openFileBtn = document.getElementById('openFileBtn')
const titleInput = document.getElementById('title')
const filePathElement = document.getElementById('filePath')


setButton.addEventListener('click', () => {
    setTitle(titleInput.value)
})


openFileBtn.addEventListener('click', async () => {
    const filePath = await openFile()
    filePathElement.innerText = filePath
})
