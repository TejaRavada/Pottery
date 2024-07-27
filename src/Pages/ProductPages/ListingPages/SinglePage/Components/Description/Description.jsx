import React, { useState } from 'react'
import './styles.css'

const Description = () => {

  const [activeTabs, setActiveTabs] = useState(0);
  return (
    <section className="detailsPageTabs">
      <div className="customTabs">

        {/*  */}
        <ul className='customTabsMob'>

          <li className="list-inline-item">
            <button className={`${activeTabs === 0 && 'active'}`} onClick={() => setActiveTabs(0)}>Description</button>
          </li>
          <li className="list-inline-item">
            <button className={`${activeTabs === 1 && 'active'}`} onClick={() => setActiveTabs(1)}>Product info</button>
          </li>
          <li className="list-inline-item">
            <button className={`${activeTabs === 2 && 'active'}`} onClick={() => setActiveTabs(2)}>Additional info</button>
          </li>
          
          {/* <li className={`${activeTabs === 0 && 'active'}`} onClick={() => setActiveTabs(0)}>Description</li>
          <li className={`${activeTabs === 1 && 'active'}`} onClick={() => setActiveTabs(1)}>Product info</li>
          <li className={`${activeTabs === 2 && 'active'}`} onClick={() => setActiveTabs(2)}>Additional info</li> */}
        </ul>
        {/*  */}

        {
          activeTabs === 0 &&
          <div className="tabContent d-flex gap-3">

              <p>Pomegranate juice is a beverage made from the fruit of the pomegranate tree (Punica granatum). Pomegranates are known for their deep red color and tart flavor. The juice is typically made by pressing the seeds of the pomegranate fruit, yielding a rich, flavorful liquid.</p>

              <p>Pomegranate juice has gained popularity in recent years due to its potential health benefits. It is rich in antioxidants, particularly polyphenols, which are believed to have various health-promoting properties, including reducing inflammation and protecting against certain diseases.</p>

              <p>Packaging and delivery of pomegranate juice typically involve several considerations to ensure the product reaches consumers in optimal condition. Here's an overview Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint fugiat quidem ipsam est totam inventore similique maiores. Molestiae, quae! At consequuntur nesciunt impedit, fuga deserunt illo praesentium quam laudantium soluta.</p>

            <h2 className='mb-2 sub-topic-heading'>Packaging & Delivery</h2>

              <p>Packaging and delivery of pomegranate juice typically involve several considerations to ensure the product reaches consumers in optimal condition. Here's an overview:</p>

              <p>Pomegranate juice is commonly packaged in glass or plastic bottles, or in cartons (such as Tetra Pak). Glass bottles are often preferred for their inert properties, preserving the taste and quality of the juice without any risk of chemical leaching. Plastic bottles are lighter and less prone to breakage, making them convenient for transportation.</p>

            <h2 className='sub-topic-heading'>Suggested Usey</h2>
            
              <p>Refrigeration not necessary</p>
              <p>Stir before serving</p>

            <h2 className='sub-topic-heading'>Other Ingredients</h2>

              <p>Organic raw pecans, organic raw cashews.</p>
              <p>This butter was produced using a LTG(Low Temperature Grinding) process </p>
              <p>Made in machinery that processes tree nuts but does not process peanuts, gluten,dairy or soy</p>

            <h2 className='sub-topic-heading'>Warnings</h2>

              <p>Refrigerated trucks or insulated containers are often used to keep the product at the appropriate temperature.</p>

          </div>}

        {
          activeTabs === 1 &&
          <div className="tabContent">
            <div className="technicalDetails">
              <h2 className='sub-topic-heading'>Technical Details</h2>
              <table>
                <tbody>
                  <tr>
                    <th>Material</th>
                    <td>Earthenware</td>
                  </tr>
                  <tr>
                    <th>Finish Type	</th>
                    <td>Polished</td>
                  </tr>
                  <tr>
                    <th>Brand </th>
                    <td>Generic</td>
                  </tr>
                  <tr>
                    <th>Colour</th>
                    <td>Red-Ochre(Gerua)</td>
                  </tr>
                  <tr>
                    <th>Capacity</th>
                    <td>2 litres</td>
                  </tr>
                  <tr>
                    <th>Product Dimensions</th>
                    <td>22.9D x 22.9W x 10.2H Centimeters</td>
                  </tr>
                  <tr>
                    <th>Item Weight</th>
                    <td>3 Kilograms</td>
                  </tr>
                  <tr>
                    <th>Coating Description	</th>
                    <td>enamel</td>
                  </tr>
                  <tr>
                    <th>Is Oven Safe</th>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <th>Manufacturer</th>
                    <td>PATIRAM PRODUCTION</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>}

        {
          activeTabs === 2 &&
          <div className="tabContent">
            <div className="technicalDetails">
              <h2 className='sub-topic-heading'>Additional Information</h2>
              <table>
                <tbody>
                  <tr>
                    <th>Manufacturer</th>
                    <td>PATIRAM PRODUCTION</td>
                  </tr>
                  <tr>
                    <th>Packer</th>
                    <td>PATIRAM PRODUCTION</td>
                  </tr>
                  <tr>
                    <th>Importer </th>
                    <td>PATIRAM PRODUCTION</td>
                  </tr>
                  <tr>
                    <th>Item Weight</th>
                    <td>3 kg</td>
                  </tr>
                  <tr>
                    <th>Net Quantity</th>
                    <td>1.00 Piece</td>
                  </tr>
                  <tr>
                    <th>Included Components</th>
                    <td>Mud Handi/ Earthen Kadai/ Mitti ke Bartan/ Clay Pot for Cooking with Lid, 50gms Organic Wood Ash for Cleaning</td>
                  </tr>
                  <tr>
                    <th>Generic Name</th>
                    <td>Mud Handi/ Earthen Kadai/ Mitti ke Bartan/ Clay Pot with Lid</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>}

      </div>
    </section>
  )
}

export default Description