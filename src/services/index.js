import Vue from 'vue'
import fakeApi from '../lib/fakeApi'

let userActivities = {
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
}

export const fetchActivities = () => {
  return fakeApi.get('activities', { force: 1 })
}

export const fetchUser = () => {
  return fakeApi.get('user', { force: 1 })
}

export const fetchCategories = () => {
  return fakeApi.get('categories', { force: 1 })
}

const generateUid = () => {
  return Math.floor(new Date() * Math.random())
}

export const postActivity = (activity) => {
  activity.id = generateUid()
  activity.progress = 0
  activity.createdAt = new Date()
  activity.updatedAt = new Date()
  return fakeApi.post('activities', activity)
}

export const fetchCategory = (category_id) => {
  return fakeApi.fetchCategory(category_id)
}

export const deleteActivityAPI = (activity) => {
  return fakeApi.delete('activities', activity)
}