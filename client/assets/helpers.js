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
  
  
      newArticle.id = data[i].id;
  
      document.querySelector('main').append(newArticle)
        
    }
    
    
      
    
  }

module.exports = {createPosts, removePreviousPosts};
