import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { Pop } from "../Utils/Pop.js"

class JobsService {
  async getJobs() {
    const res = await axios.get('https://bcw-sandbox.herokuapp.com/api/jobs')
    console.log('[GOT JOBS]', res.data) //NOTE - REALLY import to check got data.
    appState.jobs = res.data.map(j => new Job(j))
  }

  async createJob(jobData) {
    const res = await axios.post('https://bcw-sandbox.herokuapp.com/api/jobs', jobData)
    console.log('[POST JOB]', res.data);
    appState.jobs = [...appState.jobs, new Job(res.data)]
  }
  async removeJob(id) {
    const res = await axios.delete('https://bcw-sandbox.herokuapp.com/api/jobs/' + id)
    console.log('[DELETE JOB]', res.data);
    Pop.toast(res.data, 'success')
    appState.jobs = appState.jobs.filter(j => j.id != id)
  }
  async editJob(jobData, id) {
    const res = await axios.put('https://bcw-sandbox.herokuapp.com/api/jobs/' + id, jobData)
    console.log('[EDIT JOB]', res.data);
    // find the one we edited in the appstate
    let index = appState.jobs.findIndex(j => j.id == id)
    // splice out old and replace with new
    appState.jobs.splice(index, 1, new House(res.data))
    // trigger listener to draw
    appState.emit('jobs')
  }
  setActive(id) {
    let job = appState.jobs.find(j => j.id == id)
    appState.activeJob = job
  }



}


export const jobsService = new JobsService()