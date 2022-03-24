import {Link} from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import Slider from './Slider'

function Explore() {
  return (
    <div className='explore'>
      <header>
        <p className="pageHeader">Explore</p>
      </header>
      <main>
        <Slider />
        <p className="exploreCategoryHeader">Categories</p>
        <div className="exploreCategories"></div>
        <Link to='/category/rent'>
          <img src={rentCategoryImage} alt='rent'
          className='exploreCategoryImg' />
          <p className="exploreCategoryName">Place for rent</p>
        </Link> 
        <Link to='/category/sell'>
          <img src={sellCategoryImage} alt='sell'
          className='exploreCategoryImg' />
          <p className="exploreCategoryName">Place for sell</p>

        </Link>
      </main>
    </div>
  )
}

export default Explore