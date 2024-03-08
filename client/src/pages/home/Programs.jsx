import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import useUserData from "../../../hooks/useUserData"
import usePrivateApi from "../../../hooks/usePrivateApi"
import { SearchInput } from "./SearchInput"
import { useNavigate } from "react-router-dom"

export const Programs = () => {
  const [recommendedProgram, setRecommendedProgram] = useState()
  const [programs, setPrograms] = useState([])
  const { user } = useUserData()
  const privateAxios = usePrivateApi()
  const [ cookies ] = useCookies(["access_token"])
  const access_token = cookies.access_token
  const userID = localStorage.getItem('userID')
  const userRole = localStorage.getItem('userRole')
  const navigate = useNavigate()

  const fetchPrograms = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
      if (user.role === "Student") {
        const response = await privateAxios.get(`/users/${userID}/programs`, config,  userRole )

        setPrograms(response.data.response.restOfPrograms)
        setRecommendedProgram(response.data.response.recommendedPrograms)
      } else if (user.role === "Staff") {
        const response = await privateAxios.get(`/programs/get-programs` )
        setPrograms(response.data.response.programs)
      }
    } catch (err) {
      console.log(err)
      if (err.response && err.response.status === 403) {
        navigate('/auth')
       }
    }
  }

  useEffect(() => {
    fetchPrograms()
    console.log(programs)
  }, [user, access_token])

  return (
    <div className="programs">
      <SearchInput />
      {recommendedProgram && (
        <>
          <h2>Recommended</h2>
          <div className="recommended-programs">
              <div className="program-card recommended-program" key={recommendedProgram._id}>
                <div className="book-img-div">
                  <img className="book-img" src="book.png" alt="books" />
                </div>
                <div className="program-details">
                  <p className="program-title">{recommendedProgram.title}</p>
                  <p className="program-description">{recommendedProgram.description}</p>
                </div>
              </div>
          </div>
        </>
      )}
      {recommendedProgram && <h2>Others</h2>}
      <div className="other-programs">
        {programs.map((program) => (
          <div className="program-card" key={program._id}>
            <div className="book-img-div">
              <img className="book-img" src="book.png" alt="books" />
            </div>
            <div className="program-details">
              <h1 className="program-title">{program.title}</h1>
              <p className="program-description">{program.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
