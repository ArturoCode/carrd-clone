import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseUrl = "https://syibnjqmnzakjlicoahz.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // is this a new visitor
  const hashedIp = crypto
    .createHash("md5")
    .update(req.connection.remoteAddress)
    .digest("hex");
  let unique = false;

  // check if hashed ip exists
  let { data: hashed_ips, error } = await supabase
    .from("hashed_ips")
    .select("*")
    .eq("hashed_ip", hashedIp);

  if (!hashed_ips.length) {
    // if not exists then is unique and save hashedip
    const { data, error } = await supabase
      .from("hashed_ips")
      .insert([{ hashed_ip: hashedIp }]);
    unique = true;
  }

  const visits = await checkDayExists();

  if (visits.length) {
    incrementVisits(visits, unique);
  } else {
    createVisitDay(unique);
  }
}

const checkDayExists = async () => {
  let { data: visits, error } = await supabase
    .from("visits")
    .select("*")
    .eq("date", new Date().toISOString());
  return visits;
};

const incrementVisits = async (visits, unique) => {
  let newUniques = visits[0].uniques;
  if (unique) {
    newUniques++;
  }

  const { data, error } = await supabase
    .from("visits")
    .update({ visits: visits[0].visits + 1, uniques: newUniques })
    .eq("date", new Date().toISOString());

  if (error) {
    console.log(error);
  }
};

const createVisitDay = async (unique) => {
  let newUniques = 0;
  if (unique) {
    newUniques = 1;
  }

  const { data, error } = await supabase
    .from("visits")
    .insert([
      { date: new Date().toISOString(), visits: 1, uniques: newUniques },
    ]);

  if (error) {
    console.log(error);
  }
};
