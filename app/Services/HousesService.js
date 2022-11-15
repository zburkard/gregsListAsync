import { appState } from "../AppState.js"
import { House } from "../Models/House.js"
import { Pop } from "../Utils/Pop.js"

class HousesService {
  setActive(id) {
    let house = appState.houses.find(c => c.id == id)
    appState.activeHouse = house
    console.log(appState.activeHouse);
  }
  async getHouses() {
    const res = await axios.get('https://bcw-sandbox.herokuapp.com/api/houses')
    console.log('[GOT HOUSES]', res.data) //NOTE - REALLY import to check got data.
    appState.houses = res.data.map(h => new House(h))
  }
  async createHouse(houseData) {
    const res = await axios.post('https://bcw-sandbox.herokuapp.com/api/houses', houseData)
    console.log('[POST HOUSE]', res.data);
    appState.houses = [...appState.houses, new House(res.data)]
  }
  async removeHouse(id) {
    const res = await axios.delete('https://bcw-sandbox.herokuapp.com/api/houses/' + id)
    console.log('[DELETE CAR]', res.data);
    Pop.toast(res.data, 'success')
    appState.houses = appState.houses.filter(h => h.id != id)
  }
  async editHouse(houseData, id) {
    const res = await axios.put('https://bcw-sandbox.herokuapp.com/api/houses/' + id, houseData)
    console.log('[EDIT HOUSE]', res.data);
    // find the one we edited in the appstate
    let index = appState.houses.findIndex(h => h.id == id)
    // splice out old and replace with new
    appState.houses.splice(index, 1, new House(res.data))
    // trigger listener to draw
    appState.emit('houses')
  }



}


export const housesService = new HousesService()