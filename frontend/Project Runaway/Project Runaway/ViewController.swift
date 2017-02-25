//
//  ViewController.swift
//  Project Runaway
//
//  Created by Josh Gonzales-Neal on 2/24/17.
//  Copyright © 2017 se329. All rights reserved.
//

import UIKit
import CoreLocation
import GoogleMaps

class ViewController: UIViewController,CLLocationManagerDelegate {
    
    var locationManager = CLLocationManager()
    
    override func loadView() {
        // Ask for Authorisation from the User.
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        locationManager = CLLocationManager()
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        locationManager.requestAlwaysAuthorization()
        locationManager.startUpdatingLocation()
        
        // Create a GMSCameraPosition that tells the map to display the
        // coordinate -33.86,151.20 at zoom level 6.
//        let camera = GMSCameraPosition.camera(withLatitude: 41.997466, longitude: -93.632355, zoom: 15.0)
//        let mapView = GMSMapView.map(withFrame: CGRect.zero, camera: camera)
//        view = mapView
//        
//        // Creates a marker in the center of the map.
//        let marker = GMSMarker()
//        marker.position = CLLocationCoordinate2D(latitude: 41.997466, longitude: -93.632355)
//        marker.title = "Sydney"
//        marker.snippet = "Australia"
//        marker.map = mapView
    }
    
    func locationManager(manager: CLLocationManager!, didUpdateLocations locations: [AnyObject]!) {
        var locationArray = locations as NSArray
        var locationObj = locationArray.lastObject as! CLLocation
        var coord = locationObj.coordinate
        
        getCurrentLocation(coordinates: coord)
    }
    
    func locationManager(manager: CLLocationManager!, didFailWithError error: NSError!) {
        print("Error while updating location " + error.localizedDescription)
    }
    
    func getCurrentLocation(coordinates: CLLocationCoordinate2D){
        let camera = GMSCameraPosition.camera(withLatitude: coordinates.latitude, longitude: coordinates.longitude, zoom: 15.0)
        let mapView = GMSMapView.map(withFrame: CGRect.zero, camera: camera)
        view = mapView
        
        // Creates a marker in the center of the map.
        let marker = GMSMarker()
        marker.position = CLLocationCoordinate2D(latitude: coordinates.latitude, longitude: coordinates.longitude)
        marker.title = "Sydney"
        marker.snippet = "Australia"
        marker.map = mapView
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

