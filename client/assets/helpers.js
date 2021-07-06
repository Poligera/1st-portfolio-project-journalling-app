const apiDomain = "http://localhost:3000/"

function removePreviousPosts() {
    const postList = document.querySelectorAll("article")
    Array.from(postList)
    postList.forEach(element => {
        element.remove()
    });
}

function createPosts(data) {
    removePreviousPosts()
      for (let i = data.length - 1; i >= 0; i--) {
        
      const newArticle = document.createElement('article');
        
      const post  = document.createElement('div');
      post.classList.add("post");
      post.textContent = data[i].message;
  
      newArticle.append(post);
  
      const reactions = document.createElement('div');
      reactions.classList.add("reactions");
      const emojiBox = document.createElement('div');
      emojiBox.id = "emoji-box";
      const button = document.createElement('button');
      button.classList.add("collapsible");
  

      // ADD EMOJI ENTRIES 
      const emojiEntries = Object.keys(data[i].reactions) 

      emojiEntries.forEach(emojiType => {

        const reactionDiv = document.createElement('div');
        reactionDiv.classList.add(emojiType);
        reactionDiv.classList.add("emoji")
        
        const pContainer = document.createElement("div");
        pContainer.classList.add('pContainer');

        const reactionCount = document.createElement('p');
        reactionCount.classList.add(emojiType)
        reactionCount.textContent = data[i].reactions[emojiType];
        
        pContainer.append(reactionCount)
        reactionDiv.append(pContainer)
        emojiBox.append(reactionDiv);

        reactionDiv.addEventListener("click", (e) => {
            // get the parent container
            const parentArticle = e.target.closest("article");
            const itemId = parentArticle.id
            const classList = e.target.classList
            const reactionType = classList[0]

            if (reactionType === 'pContainer') {
                return
            }

            let tally = parseInt(e.target.querySelector('p').textContent);
            tally++
            // Update Dom
            e.target.querySelector("p").textContent = tally;
          
            // Update server date
            const data = {target: reactionType}

            const options = {
                  method: "PUT",
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data)
                }
            
              fetch(`${apiDomain}posts/reactions/update/${itemId}`, options)
                .then(response => response.text())
                .then()
                .catch(error => console.log(error));
        })
      });
    
  
      reactions.append(emojiBox);
      reactions.append(button);
      newArticle.append(reactions);
  
      const comments = document.createElement('div');
      comments.classList.add('comments');
  
      const headline = document.createElement("h4");
      headline.textContent = "Comments";
  
      const addCommentBtn = document.createElement('button');
      addCommentBtn.classList.add("add");
      addCommentBtn.textContent = "+";
    
      comments.append(headline);
      comments.append(addCommentBtn)
  
      if (!!(data[i].comments)) {
        data[i].comments.forEach(comment => {
            const currentComment = document.createElement("p");
            currentComment.textContent = comment;
            comments.append(currentComment);
          });
      } 

      
  
      newArticle.append(comments);
  
      button.addEventListener("click", function() {
        this.classList.toggle("active");
        var content = comments
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
  
      newArticle.id = data[i].id;
  
      document.querySelector('main').append(newArticle)
        
    }
    
    
      
    
  }

module.exports = {createPosts};
