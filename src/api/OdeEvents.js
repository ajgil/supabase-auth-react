import { useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from '../contexts/Auth'

export default function OdeEvents() {
// Get current user and signOut function from context
  const { user } = useAuth()

  const [activeItems, setActiveItems] = useState([]);
  const [inactiveItems, setInactiveItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  // get all active items by the user
  const getActiveItems = async () => {
    setLoading(true);
    try {

      const { error, data } = await supabase
        .from("events_") //the table you want to work with
        .select("title, done, id") //columns to select from the database
        .eq("user_id", user?.id) //comparison function to return only data with the user id matching the current logged in user
        .eq("done", false) //check if the done column is equal to false
        .order("id", { ascending: false }); // sort the data so the last item comes on top;

      if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block

      if (data) setActiveItems(data);

    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };


  // get all completed items by the user
  const getInactiveItems = async () => {
    setLoading(true);
    try {

      const { error, data } = await supabase
        .from("events_") //the table you want to work with
        .select("title, done, id") //columns to select from the database
        .eq("user_id", user?.id) //comparison function to return only data with the user id matching the current logged in user
        .eq("done", true) //check if the done column is equal to true
        .order("id", { ascending: false }); // sort the data so the last item comes on top

      if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block

      if (data) setInactiveItems(data);

    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  // delete row from the database
  const deleteItem = async (id) => {
    try {

      const { error } = await supabase
        .from("events_")
        .delete() //delete the row
        .eq("id", id) //the id of row to delete
        .eq("user_id", user?.id) //check if the item being deleted belongs to the user

      if (error) throw error;

      await getInactiveItems(); //get the new completed items list
      await getActiveItems(); //get the new active items list
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };


  // add new row to the database
  const addEvent = async (event) => {
    setAdding(true);
    try {

      const { error } = await supabase
        .from("events_")
        .insert({ event, user_id: user?.id }); //insert an object with the key value pair, the key being the column on the table

      if (error) throw error;

      await getActiveItems(); //get the new active items list

    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setAdding(false);
    }
  };

  // update column(s) on the database
  const updateItem = async ({ title, id }) => {
    setLoading(true);
    try {

      const { error } = await supabase
        .from("events_")
        .update({ title })
        .eq("user_id", user?.id)
        .eq("id", id); //matching id of row to update

      if (error) throw error;

      await getActiveItems();
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

    // change value of done to true
  const markAsDone = async (id) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("events_")
        .update({ done: true })
        .eq("user_id", user?.id)
        .eq("id", id); //match id to toggle

      if (error) throw error;

      await getActiveItems();
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

      // change value of done to false
  const markActive = async (id) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("events_")
        .update({ done: false })
        .eq("user_id", user?.id)
        .eq("id", id); //match id of row to toggle

      if (error) throw error;

      await getInactiveItems();
      
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

}

