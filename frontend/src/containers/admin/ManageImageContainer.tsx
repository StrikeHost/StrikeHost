import toast from "react-hot-toast";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useHistory, useParams } from "react-router";

import { api } from "utils/api";
import { Image } from "interfaces/Game";
import { Button } from "components/Button";
import { FlexGrid } from "components/FlexGrid";
import { PageTitle } from "components/PageTitle";
import { ModifyImageForm } from "components/admin/ModifyImageForm";

interface ManageImageContainerParams {
  gameId: string;
  imageId: string;
}

export const ManageImageContainer = () => {
  const history = useHistory();

  const { imageId } = useParams<ManageImageContainerParams>();

  const [image, setImage] = useState<Image>();

  /**
   * Invoked when the submit button is clicked
   */
  const handleFormSubmit = (img: Partial<Image>) => {
    const request = {
      ...image,
      ...img,
    };

    api
      .post(`/admin/image/${imageId}`, request)
      .then(() => {
        toast.success("Image updated successfully");
      })
      .catch(() => {
        toast.error("An error occurred while attempting to update this image.");
      });
  };

  /**
   * Invoked on add version button click
   */
  const handleAddVersionClick = () => {
    history.push(`/admin/image/${imageId}/version/new`);
  };

  useEffect(() => {
    api.get<Image>(`/admin/image/${imageId}`).then((response) => {
      setImage(response.data);
    });
  }, [imageId]);

  return image ? (
    <Container className="pt-4">
      <PageTitle title="Image Settings" className="pb-2" />
      <FlexGrid columns={2} gap="2rem">
        <ModifyImageForm image={image} onSubmit={handleFormSubmit} />
        <div>
          <StyledContainer>
            <h5>Available Versions</h5>
            <Button variant="primary" onClick={handleAddVersionClick}>
              Add Version
            </Button>
          </StyledContainer>
          {image.versions?.length ? (
            image.versions.map((version, index) => (
              <p key={index}>
                <Link to={`/admin/image/${imageId}/version/${version.id}`}>
                  {version.name}
                </Link>
              </p>
            ))
          ) : (
            <p>No versions found.</p>
          )}
        </div>
      </FlexGrid>
    </Container>
  ) : (
    <></>
  );
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
