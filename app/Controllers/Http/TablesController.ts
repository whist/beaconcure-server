// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Table from 'App/Models/Table'

export default class TablesController {
  public async index(ctx: HttpContextContract) {
    return [
      {
        id: 1,
        title: 'Hello world',
      },
      {
        id: 2,
        title: 'Hello universe',
      },
    ]
  }
  public async listByFile({request}) {
    const params = request.params()
    return Table.listTables(params["file"])
  }
  public async spec({request}) {
    return Table.TableSpec(request.qs("file"), request.qs("table"))
  }
  public async files() {
    return Table.listFiles()
  }
}
