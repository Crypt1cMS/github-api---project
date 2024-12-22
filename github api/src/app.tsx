import { useEffect, useState } from 'react'
import './index.css'
import MG from '../public/Magnifying glass.svg'
import Pin from '../public/Location.png'
import PinDark from '../public/pin dark.png'

interface GitHubUser {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
}

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState('Crypt1cMS');
  const [userData, setUserData] = useState<GitHubUser | null>(null)

  const fetchGitUset = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${user}`, {
        headers: {
          Authorization: `Bearer `
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }

      console.log(response)

      const data = await response.json()
      setUserData(data)

    } catch (err) {
      const error = err as Error;
      console.error(error.message);
    }

  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode]);

  return (
    <>
      <main className=' bg-[#F6F8FF] dark:bg-[#141D2F] w-full h-dvh'>

        <div className=" flex items-center justify-center h-full w-full">
          
          <div className="max-w-5xl flex flex-col gap-8 items-center justify-center"> 

            <header className='flex flex-col w-full gap-8'>

              <div className='flex items-center justify-between'>

                <h1 className=' font-bold text-3xl text-black dark:text-white'>devfinder</h1>
                <button className=' text-black dark:text-white' onClick={() => setDarkMode(!darkMode)}>{darkMode ? 'LIGHT' : 'DARK'}</button>
              
              </div>
             
              <div className='flex items-center gap-8 h3 w-full h-16 bg-white dark:bg-[#1E2A47] pr-2 pl-6 rounded-lg shadow-lg'>
                <img src={MG} alt="Magnifying glas" />

                <input 
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  className='w-full bg-white dark:bg-[#1E2A47] text-black dark:text-white' 
                  type="text" 
                  placeholder='Search Github username...' />

                <button 
                onClick={fetchGitUset}
                className='bg-[#0079FF] text-white px-4 py-3 rounded-lg'>Search</button>
              </div>

            </header>


            <div className=' flex w-full gap-8 bg-white dark:bg-[#1E2A47] rounded-lg shadow-lg p-8'>

              <div className="w-1/3">

                <img 
                  className="rounded-full w-48" 
                  src={userData?.avatar_url} 
                  alt="User Avatar" />

              </div>

              <div className="w-2/3">

                <div className="flex flex-col gap-8">

                  <div className="flex flex-col gap-2">
                    <h1 className='font-bold text-2xl text-black dark:text-white'>{userData?.name}</h1>
                    <p className='text-[#0079FF]'>@{userData?.login}</p>
                  </div>

                  <div className="">
                    <p className='text-gray-400'>{userData?.bio || "This profile has no bio..."}</p>
                  </div>

                </div>

                <div className="w-full grid grid-cols-3 justify-evenly gap-12 my-8 p-4  bg-[#F6F8FF] dark:bg-[#141D2F] rounded-lg">
                  
                  <div className='w-24 text-center'>
                    <h3 className='text-[#697C9A] dark:text-white'>Repos</h3>
                    <h2 className='font-bold text-2xl text-black dark:text-white'>{userData?.public_repos}</h2>
                  </div>

                  <div className='w-24 text-center'>
                    <h3 className='text-[#697C9A] dark:text-white'>Followers</h3>
                    <h2 className='font-bold text-2xl text-black dark:text-white'>{userData?.followers}</h2>
                  </div>

                  <div className='w-24 text-center'>
                    <h3 className='text-[#697C9A] dark:text-white'>Following</h3>
                    <h2 className='font-bold text-2xl text-black dark:text-white'>{userData?.following}</h2>
                  </div>
                </div>

                <div className="flex gap-3">
                  {!darkMode ? <img className=' object-contain ' src={PinDark} alt="Pin" /> : <img className=' object-contain ' src={Pin} alt="Pin" />}
                  <p className=' text-black dark:text-white'>{userData?.location || "No location"}</p>
                </div>

              </div>
            </div>

          </div>
        </div>

      </main>    
    </>
  )
}

export default App
