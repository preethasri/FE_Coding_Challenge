import React from 'react'
import Character from './Character';

const Characters = ({loading,error,list}) => {
  return (
     <div className="main-container">
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}

        <div className="card-container">
          {list?.length > 0 &&
            !loading &&
            list?.map((character) => {
              return <Character key={character?.id} character={character} />;
            })}
        </div>
     </div>
  )
}

export default Characters