//import { DateTime } from 'luxon'
//import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { promises as fs } from 'fs';
import Application from '@ioc:Adonis/Core/Application'


export default class Table
//  extends BaseModel
{
/*
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
*/

  static files_location = '/public/tables'



  public static async listTables(file){
    //return Application.appRoot + this.files_location + file
    try {
      const data = await fs.readFile(Application.appRoot + this.files_location + "/" + file, { encoding: 'utf8' });
      let dataJson = JSON.parse(data)
      return dataJson.tables
    } catch (e){
      throw new Error('File not found')
    }
  }
  public static async listFiles(){
    try {
      const files_list = await fs.readdir(Application.appRoot + this.files_location)
      return files_list
    } catch (e){
      throw new Error('Dir not found')
    }
  }
  public static async TableSpec(file, title){
    try {
      const tables = await this.listTables(file)
      let i=0
      for (let i=0;i<tables.length;i++){
        if (tables[i].title == title) return tables[i]
      }
      throw new Error('Table not found')
    } catch (e){
     return {error: "JSON ERROR"}
    }
  }
}
