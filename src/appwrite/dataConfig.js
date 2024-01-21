import conf from '../conf/conf.js'
import {Client , Databases , ID } from "appwrite" 

export class DataService{
    client = new Client() ;
    databases ;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId) ;
        
            this.databases = new Databases(this.client);
    }

    async saveExpense({expenseName , expense , expenseDate , expenseId}){
        try {
           return await this.databases.createDocument(
            conf.appwriteDatabaseId ,
            conf.appwriteCollectionId ,
            ID.unique() ,
            {
                Title: expenseName,  
                price: expense,
                date: expenseDate,
                expenseId 
            }
           )
        } catch (error) {
            console.log("APPWRITE SERVICE :: SAVE EXPENSE :: ERROR : " , error);
        }
    }

    async saveBudget({budgetTitle , budget}){
        try {
            console.log('Budget Title:', budgetTitle);
            console.log('Budget:', budget);

            return await this.databases.createDocument(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId ,
                ID.unique() ,
                {
                    budgetTitle , 
                    budget ,
                }
               )
        } catch (error) {
            console.log("APPWRITE SERVICE :: SAVE BUDGET :: ERROR : " , error);
        }
    }

    async getTranscations(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId
            )
        } catch (error) {
            console.log("Appwrite service :: getTranscations :: error" , error);
        }
    }

    async updateExpense({expenseName , expense , expenseDate , expenseId}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId ,
                expenseId , 
                {
                    Title: expenseName,  
                    price: expense,
                    date: expenseDate,
                    expenseId 
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updateExpense :: error :" , error);
        }
    }

    async deleteExpense(expenseId){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId , 
                conf.appwriteCollectionId ,
                expenseId 
            )
        } catch (error) {
            console.log("Appwrite service :: updateExpense :: error :" , error);
        }
    }
} 
const dataService = new DataService() ;

export default dataService ;