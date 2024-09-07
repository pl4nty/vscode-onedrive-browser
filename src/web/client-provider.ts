import * as vscode from 'vscode';
import { OneDriveClient } from './onedrive-types';

const CLIENT_ID = '0e4ed61f-18c9-45d4-8da1-d3d11a7a9765';

const SCOPES = [
  `VSCODE_CLIENT_ID:${CLIENT_ID}`,
  `VSCODE_TENANT:common`,
  'offline_access',
  'Files.ReadWrite',
];

export class ClientProvider {
  private session?: Thenable<vscode.AuthenticationSession>;

  public async demandForFs() {
    const session = await this.getSession();
    return new OneDriveClient(session.accessToken);
  }

  public async request() {
    try {
      return this.demandForFs();
    } catch {
      return undefined;
    }
  }

  private getSession() {
    this.session = vscode.authentication.getSession('microsoft', SCOPES, {
      createIfNone: true,
    });

    return this.session;
  }
}
