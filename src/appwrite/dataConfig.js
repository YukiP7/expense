import conf from '../conf/conf.js'
import {Client , Databases , ID , Query } from "appwrite" 

export class DataService{
    client = new Client() ;
    databases ;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId) ;
        
            this.databases = new Databases(this.client);
    }

    async saveExpense({ expenseName, expense, expenseDate }) {
        try {
            const userId = localStorage.getItem('userId');
            console.log(userId) ;

            if (!userId) {
                throw new Error("User not authenticated");
            }

            const data = {
                userId,
                Title : expenseName,
                price : expense,
                date : expenseDate
            };

            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                data
            );
        } catch (error) {
            console.log("DataService :: saveExpense :: error: ", error);
            throw error;
        }
    }

    async getTranscations() {
        try {
            const userId = localStorage.getItem('userId');
            console.log(userId) ;

            if (!userId) {
                throw new Error("User not authenticated");
            }

            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                  Query.limit(100),
                  Query.equal("userId",[userId]),
                ],
            );
            return response.documents;
        } catch (error) {
            console.log("DataService :: getExpenses :: error: ", error);
            throw error;
        }
    }


    async saveBudget({budgetTitle , budget}){
        try {
            const userId = localStorage.getItem('userId');
            console.log(userId) ;
            console.log('Budget Title:', budgetTitle);
            console.log('Budget:', budget);

            return await this.databases.createDocument(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId ,
                ID.unique() ,
                {
                    userId ,
                    budgetTitle , 
                    budget ,
                }
               )
        } catch (error) {
            console.log("APPWRITE SERVICE :: SAVE BUDGET :: ERROR : " , error);
        }
    }

     
    
} 
const dataService = new DataService() ;

export default dataService ;