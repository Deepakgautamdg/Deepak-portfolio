import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../api-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class BackendService {
	constructor(private http: HttpClient) { }

	execute(request: string, url: string, data?: any) {
		// JSON API
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}),
			withCredentials: true,
		};
		// this.http.post() or this.http.get()
		if (request == 'get') {
			return this.http.get<any>(url, httpOptions);
		} else if (request == 'put') {
			return this.http.put<any>(url, data, httpOptions);
		} else if (request == 'delete') {
			return this.http.delete<any>(url, httpOptions);
		} else if (request == 'patch') {
			return this.http.patch<any>(url, data, httpOptions);
		} else {
			return this.http.post<any>(url, data, httpOptions);
		}
	}

	// Common Method for Posting Data
	post(url: string, data: any) {
		return this.execute('post', url, data);
	}

	// Common Method for Puting Data
	put(url: string, data: any) {
		return this.execute('put', url, data);
	}

	//common method for patching data
	patch(url: string, data: any) {
		return this.execute('patch', url, data);
	}

	// Common Method for Getting Data
	get(url: string) {
		return this.execute('get', url, null);
	}

	// Common Method for Deleting Data
	delete(url: string) {
		return this.execute('delete', url, null);
	}

	login(userData: object) {
		const url = API_CONFIG.API.USERS.LOGIN;
		return this.post(url, userData);
	}
	/**
	 * @description This method is called to signout from syrn portal.
	 * @returns
	 */
	logout() {
		let url = API_CONFIG.API.USERS.LOGOUT;
		return this.get(url);
	}

	forgotPassword(user_data: object) {
		const url = API_CONFIG.API.USERS.FORGOT_PASSWORD;
		return this.post(url, user_data);
	}

	resetPassword(token: any, id: any, data: object) {
		const url =
			API_CONFIG.API.USERS.RESET_PASSWORD + '?token=' + token + '&id=' + id;
		return this.post(url, data);
	}

	getCurrentUser() {
		const url = API_CONFIG.API.USERS.GET_CURRENT_USER;
		return this.get(url);
	}

	Signup(userData: object, id: any = null, token: any = null) {
		let url = API_CONFIG.API.USERS.SIGNUP;
		url += id ? '?' : '';
		if (id && token) {
			url += 'id=' + id + '&token=' + token;
		}
		return this.post(url, userData);
	}

	inviteUser(user_data: object) {
		const url = API_CONFIG.API.ADMIN.INVITE_USER;
		return this.post(url, user_data);
	}

	aclAddPermission(userId: string, payload: any) {
		const url = API_CONFIG.API.ACL.ADD_PERMISSION + '/' + userId;
		return this.post(url, payload);
	}

}
