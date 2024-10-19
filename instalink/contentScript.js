(async () => {
    let followers = [];
  
    try {
      console.log('Starting follower retrieval...');
  
      const username = prompt('Please enter your Instagram username:');
  
      if (!username) {
        console.log('No username entered.');
        alert('You must enter a username.');
        return;
      }
  
      const userRes = await fetch(
        `https://www.instagram.com/web/search/topsearch/?query=${username}`
      );
      const userJson = await userRes.json();
      const user = userJson.users.find(u => u.user.username === username);
      const userId = user ? user.user.pk : null;
  
      if (!userId) {
        console.log('User not found.');
        alert('User not found.');
        return;
      }
  
      let after = null;
      let has_next = true;
  
      while (has_next) {
        const variables = {
          id: userId,
          include_reel: true,
          fetch_mutual: true,
          first: 50,
          after: after,
        };
  
        const res = await fetch(
          `https://www.instagram.com/graphql/query/` +
          `?query_hash=c76146de99bb02f6415203be841dd25a` +
          `&variables=${encodeURIComponent(JSON.stringify(variables))}`
        );
        const json = await res.json();
        const edges = json.data.user.edge_followed_by.edges;
  
        followers = followers.concat(
          edges.map(({ node }) => ({
            username: node.username,
            full_name: node.full_name,
          }))
        );
  
        has_next = json.data.user.edge_followed_by.page_info.has_next_page;
        after = json.data.user.edge_followed_by.page_info.end_cursor;
        //avoid getting rate limited 
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
  
      console.log('Followers:', followers);
      alert(`Retrieved ${followers.length} followers. Check console.`);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Check console for details.');
    }
  })();
  