import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { jobsService } from "../Services/JobsService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function _drawJobs() {
  const jobs = appState.jobs
  let template = ''
  jobs.forEach(j => template += j.ListTemplate)
  setHTML('listings', template)
}
function _drawJobsForm() {
  let job = appState.activeJob
  setHTML('listing-form', Job.GetJobFormTemplate(job))
}

export class JobsController {
  constructor() {
    appState.on('jobs', _drawJobs)
    appState.on('activeJob', _drawJobsForm)
    // this.getJobs()
    // _drawCarForm()
  }

  async getJobs() {
    try {
      await jobsService.getJobs()
    } catch (error) {
      // NOTE best catch alerts the user and logs the error
      Pop.error(error.message)
      console.error(error)
    }
  }
  async createJob() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      let jobData = getFormData(form)
      Pop.toast('Created', 'success')
      form.reset()
      console.log(jobData);
      await jobsService.createJob(jobData)
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }

  setActive(id) {
    jobsService.setActive(id)
  }

  async editJob(id) {
    try {
      window.event.preventDefault()
      const form = window.event.target
      const jobData = getFormData(form)
      console.log('editing', form);
      await jobsService.editJob(jobData, id)
      Pop.toast('edited', 'info')
      form.reset()
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }

  async removeJob(id) {
    try {
      console.log('deleting', id);
      if (await Pop.confirm('Are you sure?', 'Someone spent a lot of time browsing the internet for that perfect picture', 'yeah toss it', 'warning')) {
        await jobsService.removeJob(id)
      }
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }


  showJobs() {
    this.getJobs()
    _drawJobsForm()
  }

}