import { api } from "../utils/api";

export class UserService {
	/**
	 * Attempts to link a user's discord account with their strike account
	 */
	public static LinkUserAccount = async (
		discord_id: string,
		strike_id: string
	): Promise<boolean> => {
		const results = await api.post(`/discord/link`, {
			discord_id,
			strike_id,
		});

		if (results) {
			return true;
		}

		return false;
	};

	/**
	 * Attempts to retrieve a user's strike account
	 */
	public static GetUserAccount = async (discord_id: string): Promise<any> => {
		const results = await api.get(`/discord/user/${discord_id}`);

		if (results) {
			return results.data;
		}

		return null;
	};
}
