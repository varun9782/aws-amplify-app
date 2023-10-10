import './App.css';
import { DataStore } from '@aws-amplify/datastore';
import { Comment } from './models';
import { useEffect } from 'react';
import { LoginPage } from './loginPage';

async function data(){
    const  newComment= new Comment({
      postID:"abc",
      content: "this the content for amplify using react",
    });
    await DataStore.save(newComment);
    console.log("Comment", newComment);
}

function App() {

  useEffect(() => {
    data();
  },[]);

  return (
    <div className="App">
      <LoginPage/>
    </div>
  );
}

export default App;
