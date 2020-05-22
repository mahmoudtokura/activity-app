import Vue from 'vue'

const data = {
  activities: {
    '1546968934': {
      id: '1546968934',
      title: 'Learn Vue.js',
      notes: 'I started today and it was not good.',
      progress: 25,
      category: '1546969049',
      createdAt: 1546969144391,
      updatedAt: 1546969144391
    },
    '1546969212': {
      id: '1546969212',
      title: 'Read Witcher Books',
      notes: 'These books are super nice',
      progress: 67,
      category: '1546969049',
      createdAt: 1546969144391,
      updatedAt: 1546969144391
    }
  },
  categories: { 
    '1546969049': {text: 'books', id:'1546969049'},
    '1546969225': {text: 'movies', id:'1546969225'}
  },
  user: {
    name: 'Mahmoud Tokura',
    id: '-Aj34jknvncx98812',
  }
}

class FakeApi {
  // A random number generator to determine if we would resolve the promise
  canContinue() {
    const rndNumber = Math.floor(Math.random() * 10)
    if (rndNumber > 5) {
      return true
    }
    return false
  }

  get(resource, options ){
    const { force } = options
    
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        if (force || this.canContinue()) {
          resolve(data[resource])
        } else {
          reject('Cannot fetch ' + resource)
        }
      }, 1000)
    })
  }
  post(resource, activity){
    Vue.set(data[resource], activity.id, activity)
  }

  delete(resource, activity) {
    Vue.delete(data[resource], [activity.id]) 
  }

  // helper function
  fetchCategory(categoryId) {
    return data.categories[categoryId]
  }
}

export default new FakeApi()