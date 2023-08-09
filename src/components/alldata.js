import { useState, useEffect } from "react";
import axios from '../api/axios'



const ALLDATA_URL = '/accounts'

const AllData = () => {

    const [allData, setAllData] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        

   const getData = async () => {
        try {
            const response = await axios.get(ALLDATA_URL, 
                JSON.stringify( [allData] ),
                {
                headers: { 'Content-Type' : 'application/json' },
               
                withCredentials: true
                });
                console.log(response.data);
               isMounted && setAllData(response.data)
            } catch (err) {
            console.error(err)
        }
    }
        getData();
        return () => {
            isMounted= false;
            controller.abort();
        }

    }, [])
     
   

    return (
        <article>
            <h2>User Accounts</h2>
            {allData?.length
            ? (
                <ul>
                    {allData.map((allData, i) => <li key={i}>
                       <p className="card-text">First Name: {allData?.firstName}</p> 
                       <p className="card-text">Last Name: {allData?.lastName}</p> 
                       <p className="card-text">Email: {allData?.email}</p> 
                       <p className="card-text">Username: {allData?.username}</p> 
                       <p className="card-text">Password: {allData?.password}</p> 
                       <p className="card-text">Balance: {allData?.balance}</p>
                       
                        </li> )}
                </ul>

        
            ) : <p>No Data Found</p>
        }
        <br />
        </article>
      
 )} 

 






export default AllData