import { 
  Route, 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements 
} from 'react-router-dom'
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';



const App = () => {
  // Add a new job
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    });
    return res.json();
  }

  // Delete job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  }

  // Update job
  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    });
    console.log(res);
    return;
  }
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}> 
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob}/>} loader={jobLoader} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob}/>} loader={jobLoader} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );
  
  return <RouterProvider router={router}/>
}

export default App