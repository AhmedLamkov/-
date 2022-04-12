let fruits = [
{id:1, title: 'Яблоки', price: 20, img:'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' },
{id:2, title: 'Апельсины', price: 30, img:'https://images.unsplash.com/photo-1603664454146-50b9bb1e7afa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' },
{id:3, title: 'Манго', price: 40, img:'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80' }
]

const toHTML = fruit => `
<div class="col">
<div class="card">
    <img class="card-img-top" style="height: 300px;" src="${fruit.img}" alt="${fruit.title}">
    <div class="card-body">
      <h5 class="card-title">${fruit.title}</h5>
      <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
      <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
    </div>
  </div>
</div>
`

function render () {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}
render ()
const priceModal = $.modal({
    title: 'Цена на Товар',
    closable: true ,
    width: '400px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
            priceModal.close()
        }},
    ]
})
document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)
    if (btnType === 'price') {
        priceModal.setContent (`
        <p>Цена на ${fruit.title} : <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
        } else if (btnType === 'remove') {
            $.confirm({
                title:'Вы уверены?',
                content:`<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
            }). then(() => {
                fruits = fruits.filter(f => f.id !==id)
                render()
            }).catch(() => {
                console.log('Cancel')
            })
        }      
})