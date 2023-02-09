import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { money } from "../assets";
import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage, getMinimumDate } from "../utils";
import { Flex, Image, Text } from "theme-ui";
import Layout from "../components/Layout";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        window.location.reload(true);
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    <Layout isLoading={isLoading}>
      <Flex
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bg: "#1c1c24",
          borderRadius: "10px",
          padding: "10px",
          filter: isLoading ? "blur(5px)" : "none",
        }}
      >
        <Flex
          sx={{
            justifyContent: "center",
            alignItems: "center",
            padding: "16px",
            bg: "#00b9bc",
            borderRadius: "10px",
          }}
        >
          <Image
            src={money}
            alt="money"
            sx={{
              width: "40px",
              height: "40px",
              objectFit: "contain",
            }}
          />
          <Text
            sx={{
              fontFamily: "sans-serif",
              fontWeight: "bold",
              fontSize: "18px",
              lineHeight: "38px",
              color: "white",
            }}
          >
            Start a Campaign
          </Text>
        </Flex>

        <Flex
          id="formBox"
          as="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            mt: "65px",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Flex
            sx={{
              flexWrap: "wrap",
              gap: "40px",
            }}
          >
            <FormField
              labelName="Your Name *"
              placeholder="John Doe"
              type="input"
              inputType="text"
              value={form.name}
              handleChange={(e) => handleFormFieldChange("name", e)}
            />
            <FormField
              labelName="Campaign Title *"
              placeholder="Write a title"
              type="input"
              inputType="text"
              value={form.title}
              handleChange={(e) => handleFormFieldChange("title", e)}
            />
          </Flex>
          <FormField
            labelName="Story *"
            placeholder="Write your story"
            type="textarea"
            value={form.description}
            handleChange={(e) => handleFormFieldChange("description", e)}
          />
          <Flex
            sx={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              padding: "4px",
              bg: "#FF8848",
              height: "120px",
              borderRadius: "10px",
            }}
          >
            <Image
              src={money}
              alt="money"
              sx={{
                width: "40px",
                height: "40px",
                objectFit: "contain",
              }}
            />
            <Text
              sx={{
                fontFamily: "sans-serif",
                fontWeight: "bold",
                fontSize: "25px",
                color: "white",
                ml: "20px",
              }}
            >
              You will get 100% of the raised amount
            </Text>
          </Flex>

          <Flex
            sx={{
              flexWrap: "wrap",
              gap: "40px",
            }}
          >
            <FormField
              labelName="Goal *"
              placeholder="ETH 0.50"
              type="input"
              inputType="text"
              value={form.target}
              handleChange={(e) => handleFormFieldChange("target", e)}
            />
            <FormField
              labelName="End Date *"
              placeholder="End Date"
              type="input"
              inputType="date"
              min={getMinimumDate()}
              value={form.deadline}
              handleChange={(e) => handleFormFieldChange("deadline", e)}
            />
          </Flex>

          <FormField
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            type="input"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange("image", e)}
          />

          <Flex
            sx={{
              justifyContent: "center",
              alignItems: "center",
              mt: "40px",
            }}
          >
            <CustomButton
              btnType="submit"
              title="Submit new campaign"
              sx={{
                bg: "#00b9bc",
                fontFamily: "sans-serif",
                fontWeight: "bold",
                fontSize: "18px",
                lineHeight: "38px",
                color: "white",
                ":hover": {
                  outline: "solid #FF8848",
                },
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default CreateCampaign;
