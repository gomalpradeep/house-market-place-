import {useEffect, useState} from 'react'
import {useParams } from 'react-router-dom'
import {collection, getDocs, query, where, orderBy, limit,
startAfter} from 'firebase/firestore'
 
import {db} from '../firebase.config'
import Spinner from '../components/Spinner'
import {  toast } from 'react-toastify';
import ListingItem from '../components/ListingItem'

function Offers() {
     //eslint-disable-next-line
    const [listings, setListings] = useState(null)
    const [loading, setloading] = useState(true)
    const [lastFetchedListing, setLastFetchListing] = useState(null)

    const params = useParams()

    useEffect(()=>{
        const fetchListings = async() =>{
            try{
                //get reference
                const listingRef = collection(db,'listings')
                //create a query 
             
                const q =query(listingRef,
                     where('offer','==',true),
                orderBy('timestamp','desc'), limit(1))
                //Execute query
                
                const querySnap = await getDocs(q)

                const lastVisible = querySnap.docs[querySnap.docs.length-1]

                setLastFetchListing(lastVisible)

                let listings =[]

                querySnap.forEach((doc)=>{
                    console.log(doc.data())
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setListings(listings)
                setloading(false)
            }catch(error){
                console.log("error",error)
                toast('Could not fetch listings')
            }
        }

        fetchListings()
    },[])

    const onLoadMoreListings = async() =>{
        try{
            //get reference
            const listingRef = collection(db,'listings')
            //create a query 
         
            const q =query(listingRef,
                 where('offer','==',true),
            orderBy('timestamp','desc'),startAfter(lastFetchedListing), limit(1))
            //Execute query
            
            const querySnap = await getDocs(q)
            let listings =[]

            querySnap.forEach((doc)=>{
                console.log(doc.data())
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            const lastVisible = querySnap.docs[querySnap.docs.length-1]

            setLastFetchListing(lastVisible)

            setListings((prevState) => [...prevState,...listings])
            setloading(false)
        }catch(error){
            console.log("error",error)
            toast('Could not fetch listings')
        }
    }

  return (
    <div className='category'>
        <header>
            <p className="pageHeader">
                Offers
            </p>
        </header>
        {loading ? (
            <Spinner />
        ) : listings && listings.length >0 ?(
        <>
            <main>
                <ul className="categoryListings">
                    {listings.map((listing)=>(
                       <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
                    ))}
                </ul>
            </main>
            
            <br /><br />

            {lastFetchedListing && (
                <p className="loadMore" onClick={onLoadMoreListings}>Load More</p>
            )}
        </>
        ):(<p>There are no current offers </p>)
    }
    </div>
  )
}

export default Offers