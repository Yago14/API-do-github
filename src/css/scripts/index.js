
// buscar dados da api 
async function getuser(userName) {
   const response = await fetch(`https://api.github.com/users/${userName}`)
   return await response.json()

}

async function getRepositories(userName) {
   const response = await fetch(`https://api.github.com/users/${userName}/repos`)
   return await response.json()

}
async function getEvents(userName) {
   const response = await fetch(`https://api.github.com/users/${userName}/events`)
   return await response.json()

}

async function userGetEvents(userName){
  await getEvents(userName).then(envents => {

   let eventosDoUsuario = ""

   envents.forEach(userEnvent =>{
    
     eventosDoUsuario += `<li> ${userEnvent.repo.name} </li>` 
     
     
   })

   document.querySelector(".profile-data").innerHTML +=`
   
     <h2>Eventos</h2>

     <ul>${eventosDoUsuario}</ul>
     `

   })

   
   
}






// eventos 

document.addEventListener("keypress", (enter) => {
   if (enter.key === "Enter") {
      const userName = document.querySelector("#input-search").value
      getUserProfiele(userName)
   }
})

document.querySelector("#btn-search").addEventListener("click", () => {
   const userName = document.querySelector("#input-search").value
   getUserProfiele(userName)

})

// imprimir dados na tela 
function getUserProfiele(userName) {


   getuser(userName).then(data => {
    

      let userInfor = `
      <div class="info" >

      <img src="${data.avatar_url}" alt="Imagem de perfil do usuário"/>
         <div class = "data">
      <h2>${data.name ?? "Não tem nome cadastrado !!"}</h2>
      <p>${data.bio ?? "Não tem bio cadastrada !!"}</p>
      
      <span>following ${data.following}</span>
      <p>followers ${data.followers}</p>
      </div>
    
      </div>
  `
      document.querySelector(".profile-data").innerHTML = userInfor

      getRepositoriesUser(userName)

      userGetEvents(userName)


   })

}

function getRepositoriesUser(userName) {
   getRepositories(userName).then(dataRepos => {

      

      let repositorierItens = ""

      dataRepos.forEach(repo => {
        
         console.log(repo)
         repositorierItens += `<li><a href="${repo.html_url}">${repo.name}</a>
         &#129348;${repo.forks} &#11088;${repo.stargazers_count } &#128064;${repo.watchers} &#128736;${repo.language ?? ''}</li>`

         // forks
         // stargazers_count
         // watchers
         // language
         

      })
      document.querySelector(".profile-data").innerHTML +=`
      <div class="repositories section">
        <h2>Repositórios</h2>
        <ul>${repositorierItens}</ul>
        </div>`
   })

}
getUserProfiele("yago14")




