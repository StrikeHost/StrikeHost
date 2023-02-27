import MockAdapter from "axios-mock-adapter";

import { api } from "../utils/api";
import { InstanceService } from "../services/InstanceService";

describe("InstanceService", () => {
  describe("getInstances", () => {
    it("should return instances", async () => {
      // Arrange
      const discordId = "123";
      const expectedInstances = [{ id: "1" }, { id: "2" }];
      const mockAxios = new MockAdapter(api);
      mockAxios
        .onGet(`/discord/user/${discordId}/instances`)
        .reply(200, expectedInstances);

      // Act
      const instances = await InstanceService.getInstances(discordId);

      // Assert
      expect(instances).toEqual(expectedInstances);
    });
  });
});
