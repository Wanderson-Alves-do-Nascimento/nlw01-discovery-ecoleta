/* get States*/
function populateUFs(){
  const ufSelect = document.querySelector("select[name=uf]");
  const urlUFs = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
  
  fetch(urlUFs)
  .then(res => {return res.json()})
  .then(states =>{
     for(const state of states){
      ufSelect.innerHTML = ufSelect.innerHTML + `<option value="${state.id}">${state.nome}</option>`
    }
  })
}
populateUFs()

/* Get Cities */

function getCities(event){
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")
  
  const stateSelected = event.target.value
  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text
  
  const urlCities = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'

  citySelect.innerHTML ='<option value="">Selecione a Cidade</option>'
  citySelect.disabled = true
  fetch(`${urlCities}/${stateSelected}/distritos?orderBy=nome`)
  .then(res => {return res.json()})
  .then(cities =>{
    for(const city of cities){
      citySelect.innerHTML = citySelect.innerHTML + `<option value="${city.nome}">${city.nome}</option>`
    }
    citySelect.disabled = false;
  })
}
document.querySelector("select[name=uf]").addEventListener("change",  getCities)


// Itens de Coleta

const itemsToColect = document.querySelectorAll('.items-grid li')

for(const item of itemsToColect){
  item.addEventListener('click',handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')

let selectedItems = []

function handleSelectedItem(event){
  const itemLi = event.target 
  itemLi.classList.toggle('selected')
  
  const itemId = event.target.dataset.id 
  
  const alreadySelected =  selectedItems.findIndex(item =>{
    const itemFound = item == itemId
    return itemFound
  })

  if(alreadySelected >= 0){
    const filteredItems = selectedItems.filter(item =>{
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })
    selectedItems = filteredItems
  }else {
    selectedItems.push(itemId)
  }
  collectedItems.value = selectedItems 
}