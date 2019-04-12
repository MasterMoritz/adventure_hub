import gql from "graphql-tag";

export default{
    name: 'pagination',
    props: ['currentPage', 'pageSize'],
    apollo: {
        // Simple query that will update the 'advData' vue property
        advData: gql`
          query {
            advData: adventure {
              adventureKey
              name
              image
              description
            }
          }
        `
      },

    compute: {
        updatePage(pageNumber){
            this.$emit('page:update', pageNumber);
          },
          totalPages() {
           return 20
            //math.ceil(this.advData.length / this.pageSize);
          },
          showPreviousLink(){
            return this.currentPage == 0 ? false : true;
          },
          showNextLink(){
            return this.currentPage == (this.totalPages()-1) ? false: true;
          }
    }
}